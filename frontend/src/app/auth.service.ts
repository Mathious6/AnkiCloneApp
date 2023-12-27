import {Injectable} from '@angular/core';
import {HttpFacadeService, user} from "./http-facade.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  session: any;
  constructor(private httpFacadeService: HttpFacadeService, private router: Router) {
    let session: any = localStorage.getItem('session');
    if (session){
      session = JSON.parse(session);
    }
    this.session = session;
  }

  login(username: string, password: string): Observable<[boolean, boolean]> {
    return new Observable<[boolean, boolean]>(observer => {
      this.httpFacadeService.getAllUsers().subscribe({
        next: (data: user[]) => {
          const requiredUser = data.find(user =>
              user.pseudo === username || user.mail === username
          );

          if (requiredUser) {
            if (requiredUser.isActive) {
              if (requiredUser.password === password) {
                this.session = requiredUser;
                localStorage.setItem('session', JSON.stringify(this.session));
                observer.next([true, true]); // Successful login and user activated
              } else {
                observer.next([false, false]); // Incorrect password
              }
            } else {
              observer.next([true, false]); // Successful login, but user deactivated
            }
          } else {
            observer.next([false, false]); // User not found (failed login)
          }

          observer.complete();
        },
        error: err => {
          console.error('Error fetching users:', err);
          observer.next([false, false]); // Error during login attempt
          observer.complete();
        }
      });
    });
  }

  changePassword(password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.httpFacadeService.changePassword(this.session, password).subscribe({
        next: (userData) => {
          this.session = userData;
          observer.next(true); // Password change successful
          observer.complete();
        },
        error: () => {
          observer.next(false); // Error during password change
          observer.complete();
        }
      });
    });
  }

  logout(){
    this.session = undefined;
    localStorage.removeItem('session');
    this.router.navigateByUrl('/');
  }
}
