import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private changePasswordClickSource = new Subject<boolean>();
  changePasswordClick$ = this.changePasswordClickSource.asObservable();
  openChangePassword() {
    this.changePasswordClickSource.next(true);
  }
  resetChangePassword() {
    this.changePasswordClickSource.next(false);
  }
}
