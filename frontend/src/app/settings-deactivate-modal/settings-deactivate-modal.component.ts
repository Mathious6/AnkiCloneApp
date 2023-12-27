import {Component, inject} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpFacadeService} from "../http-facade.service";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

@Component({
  selector: 'app-settings-deactivate-modal',
  templateUrl: './settings-deactivate-modal.component.html',
  styleUrls: ['./settings-deactivate-modal.component.css']
})
export class SettingsDeactivateModalComponent {
  modal = inject(NgbActiveModal);
  modalService = inject(NgbModal);
  userPseudo: string = '';
  userId: number = 0;
  constructor(private httpFacadeService: HttpFacadeService) {}

  // Set the userPseudo value when the modal is opened
  setUserPseudo(userPseudo: string): void {
    this.userPseudo = userPseudo;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }
  deactivateUser(userId: number) {
    this.httpFacadeService.deactivateUser(userId).subscribe({
      next: value => this.modal.close('Ok click'),
      error: err => {
        this.modal.close('Ok click');
        const modalRef = this.modalService.open(ErrorModalComponent, { centered: true });
        console.log(err.error);
        modalRef.componentInstance.setErrorMessage(err.error.error);
      },
    });
  }
}