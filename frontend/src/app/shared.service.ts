// shared.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private changePasswordClickSource = new Subject<boolean>();
  changePasswordClick$ = this.changePasswordClickSource.asObservable();
  private loginStatusSubject = new Subject<boolean>();
  loginStatus$ = this.loginStatusSubject.asObservable();

  openChangePassword() {
    this.changePasswordClickSource.next(true);
  }

  resetChangePassword() {
    this.changePasswordClickSource.next(false);
  }

  notifyLoginStatusChanged(loginSuccess: boolean) {
    this.loginStatusSubject.next(loginSuccess);
  }
}
