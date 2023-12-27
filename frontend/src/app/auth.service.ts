import {Injectable, OnInit} from '@angular/core';
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

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.httpFacadeService.getAllUsers().subscribe({
        next: (data: user[]) => {
          const requiredUser = data.find(user =>
            user.pseudo === username || user.mail === username
          );

          if (requiredUser && requiredUser.password === password) {
            this.session = requiredUser;
            localStorage.setItem('session', JSON.stringify(this.session));
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error: err => {
          console.error('Error fetching users:', err);
          observer.next(false);
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
