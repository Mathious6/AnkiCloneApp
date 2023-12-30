import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  modal = inject(NgbActiveModal);
  errorMessage: string = '';
  setErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }
}
