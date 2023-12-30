import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, tag} from "../http-facade.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})


export class NewPackageComponent implements OnInit {

  lessonForm: FormGroup;
  tagForm : FormGroup
  errorMessage: string = '';
  tagsTab : tag[] = [];
  constructor(private formBuilder: FormBuilder, private httpservice : HttpFacadeService, private router: Router, private authService : AuthService) {
    this.lessonForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      targetAudience: ['', Validators.required],
      duration:['', [Validators.required, Validators.min(0)]],
      tags: ['']
    });
    this.tagForm = formBuilder.group({
      newTag: ['', [Validators.required, Validators.pattern(/\S/)]]
    });
    }

  ngOnInit() {
    this.httpservice.getTags().subscribe((data) => {
      this.tagsTab=data;
    })
  }

  onCreate() {
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


    this.httpservice.postNewLearningPackage(title,description,category,targetAudience,duration,this.authService.session.userId).subscribe({
      next: (value) => {
        this.lessonForm.reset();
      },
      error: (error) => { console.error(title,description,category,targetAudience,duration,this.authService.session.userId, 'error :', error)},
      complete: () => {}
    });
  }

  onCreateTag() : void{
    if(!this.tagExist(this.tagForm.get('newTag')?.value))
    {
      this.httpservice.postTags(this.tagForm.get('newTag')?.value,this.tagForm.get('newTag')?.value).subscribe({
        next: (value) => {
          this.tagForm.reset();
        },
        error: (error) => { console.error(this.tagForm.get('newTag')?.value, 'error :', error)},
        complete: () => {}
      });
    }
    else {
      this.errorMessage = 'tag already exists';
    }

  }

  tagExist(name : string) : boolean {
    var exists = false;
    for (const tag of this.tagsTab)
    {
      if(tag.englishKeyword.toLowerCase() == name.toLowerCase())
      {
        exists = true;
      }
    }
    return exists;
  }

}
