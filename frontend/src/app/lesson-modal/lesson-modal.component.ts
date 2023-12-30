import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpFacadeService} from "../http-facade.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-lesson-modal',
  templateUrl: './lesson-modal.component.html',
  styleUrls: ['./lesson-modal.component.css']
})
export class LessonModalComponent {
  modal = inject(NgbActiveModal);
  action: string = '';
  packageTitle: string = '';
  packageId: number = 0;
  userId: number = 0;

  constructor(private httpFacadeService: HttpFacadeService) {
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  setPackageId(packageId: number) {
    this.packageId = packageId;
  }

  setPackageTitle(packageTitle: string): void {
    this.packageTitle = packageTitle;
  }

  setAction(action: string): void {
    this.action = action;
  }

  doPackageAction() {
    if (this.action === 'reset the progress of') {
      this.httpFacadeService.resetUserLearningPackage(this.userId, this.packageId).pipe(
        switchMap(() => {
          this.modal.close('Ok click');
          window.location.reload();
          return of();
        })
      ).subscribe();
    } else if (this.action === 'delete') {
      this.httpFacadeService.resetUserLearningPackage(this.userId, this.packageId).pipe(
        switchMap(() => this.httpFacadeService.deleteUserLearningPackage(this.userId, this.packageId))
      ).subscribe({
        next: () => {
          this.modal.close('Ok click');
          window.location.reload();
        }
      });
    } else {
      this.modal.close('Ok click');
    }
  }
}
