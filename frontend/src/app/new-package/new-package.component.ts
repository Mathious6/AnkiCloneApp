import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})
export class NewPackageComponent {
  lessonForm: FormGroup;
  constructor(formBuilder: FormBuilder) {
    this.lessonForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      level: ['', Validators.required],
      tags: ['', Validators.required],
      duration:['', [Validators.required, Validators.min(0)]]
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
