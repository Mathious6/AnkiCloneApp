import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-new-lesson-modal',
  templateUrl: './new-lesson-modal.component.html',
  styleUrls: ['./new-lesson-modal.component.css']
})
export class NewLessonModalComponent {
  modal = inject(NgbActiveModal);
  userId: number = 0;
}
