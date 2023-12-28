import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LearningPackage} from "../http-facade.service";
@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})


export class NewCardComponent {

  public lp : LearningPackage[] = [];

  lessonForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.lessonForm = formBuilder.group({
      recto: ['', Validators.required],
      verso: ['', Validators.required]
    });
  }
  onCreate() {
    if (this.lessonForm.valid) {
      const formData = this.lessonForm.value;
      console.log('Form data submitted:', formData);
    } else {
      console.log('Form is invalid. Please check the required fields.');
    }
  }
}
