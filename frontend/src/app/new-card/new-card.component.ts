import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, LearningFact, LearningPackage} from "../http-facade.service";
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})


export class NewCardComponent {

  public lp : LearningPackage[] = [];
  selectedPackage: string = '';

  lessonForm: FormGroup;
  session: any;

  constructor(private formBuilder: FormBuilder, private httpservice : HttpFacadeService) {
    let session: any = localStorage.getItem('session');
    if (session){
      session = JSON.parse(session);
    }
    this.session = session;

    this.lessonForm = formBuilder.group({
      recto: ['', Validators.required],
      verso: ['', Validators.required],
      image: [''],
      url: [''],
      source: ['']
    });
  }

  PackageId(): number {
    var id = 0;
    for (let p of this.lp) {
      if (this.selectedPackage === p.title) {
        id = p.packageId;
      }
    }
    return id;
  }


  onCreate() {
    const id = this.session.id()

    // @ts-ignore
    const front = this.lessonForm.get('front').value;
    // @ts-ignore
    const image = this.lessonForm.get('image').value;
    // @ts-ignore
    const url = this.lessonForm.get('url').value;
    // @ts-ignore
    const back = this.lessonForm.get('back').value;
    // @ts-ignore
    const source = this.lessonForm.get('source').value;

    if (this.lessonForm.valid) {
      this.httpservice.postNewLearningFact(front, back, source,
        image, url,this.PackageId(), id)  //packageId,

    } else {
      console.log('Form is invalid. Please check the required fields.');
    }

  }
}
