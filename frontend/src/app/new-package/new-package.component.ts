import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService} from "../http-facade.service";

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})


export class NewPackageComponent {
  session: any;
  lessonForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private httpservice : HttpFacadeService) {
    let session: any = localStorage.getItem('session');
    if (session){
      session = JSON.parse(session);
    }
    this.session = session;
    this.lessonForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['', Validators.required],
      duration:['', [Validators.required, Validators.min(0)]]
    });
  }
  onCreate() {
    const id = this.session.id()
    // @ts-ignore
    const title = this.lessonForm.get('title').value
    // @ts-ignore
    const description = this.lessonForm.get('description').value
    // @ts-ignore
    const category = this.lessonForm.get('category').value
    // @ts-ignore
    const targetAudience = this.lessonForm.get('targetAudience').value
    // @ts-ignore
    const duration = this.lessonForm.get('duration').value

    this.httpservice.postNewLearningPackage(title,description,category,targetAudience,duration,id)
  }

}
