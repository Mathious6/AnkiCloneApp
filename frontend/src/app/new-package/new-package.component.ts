import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, LearningPackage, tag} from "../http-facade.service";
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
  SelectedTags : tag[] = [];
  AllPackages : LearningPackage[] = [];


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
      newTag: ['', [Validators.required, Validators.pattern(/\S/)]],
      selectTag: ['']
    });
    }

  ngOnInit() {
    this.httpservice.getTags().subscribe((data) => {
      this.tagsTab=data;
    })
  }

  onCreate() {

    this.SelectedTags = this.tagForm.get('selectTag')?.value;

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

    if(this.SelectedTags.length>0)
    {
      for( const t of this.SelectedTags)
      {
        this.httpservice.postPackageTag(this.findPackageId(title), t.tagId, t.englishKeyword, t.frenchTranslation).subscribe({
          next: (value) => {
            this.tagForm.reset();
          },
          error: (error) => { console.error(t.tagId, t.englishKeyword, t.frenchTranslation, 'error :', error)},
          complete: () => {}
        });
      }
    }
  }

  onCreateTag() : void{
    if(!this.tagExist(this.tagForm.get('newTag')?.value))
    {
      this.httpservice.postTags(this.tagForm.get('newTag')?.value,this.tagForm.get('newTag')?.value).subscribe({
        next: (value) => {
          this.tagForm.reset();
          this.httpservice.getTags().subscribe((data) => {this.tagsTab=data;})
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

  findPackageId(title : string) : number
  {
    var id = 0;
    this.httpservice.getPackageCreatorId(this.authService.session.userId).subscribe({
      next: (learningPackages) => {
        this.AllPackages = learningPackages;

        for (const lp of this.AllPackages) {
          if (title === lp.title) {
            id = lp.packageId;
          }
        }
      },
      error: (error) => {
        console.error('Error fetching packages:', error);
      },
      complete: () => {
      }
    });

    return id;
  }

}
