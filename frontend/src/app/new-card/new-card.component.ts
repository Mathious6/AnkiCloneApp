import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, LearningFact, LearningPackage} from "../http-facade.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})


export class NewCardComponent implements OnInit{

  lp : LearningPackage[] = [];
  public lessonForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private httpFacadeService : HttpFacadeService, private router: Router, private authService : AuthService) {
    this.lessonForm = formBuilder.group({
      selectedPackage: ['',Validators.required],
      recto: ['', Validators.required],
      verso: ['', Validators.required],
      image: [''],
      url: [''],
      source: ['', Validators.required]
    });
  }

    ngOnInit(){
      this.httpFacadeService.getAllUserLearningPackage(this.authService.session.userId).subscribe({
        next: learningPackages =>{
          this.lp = learningPackages
        } ,
      });
    }




  PackageId(): number {
    var id = 0;
    for (let p of this.lp) {
      if (this.lessonForm.get('selectedPackage')?.value === p.title) {
        id = p.packageId;
      }
    }
    return id;
  }


  onCreate() {
    // @ts-ignore
    const front = this.lessonForm.get('recto')?.value;
    // @ts-ignore
    const image = this.lessonForm.get('image')?.value;
    // @ts-ignore
    const url = this.lessonForm.get('url')?.value;
    // @ts-ignore
    const back = this.lessonForm.get('verso')?.value;
    // @ts-ignore
    const source = this.lessonForm.get('source')?.value;
    if (this.lessonForm.valid) {
      this.httpFacadeService.postNewLearningFact(front, back, source,
        image, url,this.PackageId(), this.authService.session.userId).subscribe({
        next: (value) => {
          this.lessonForm.reset();
        },
        error: (error) => {},
        complete: () => {}
      });
    } else {
      console.log('Form is invalid. Please check the required fields.');
    }

  }
}
