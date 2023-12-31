import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, Tag} from "../http-facade.service";
import {AuthService} from "../auth.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})

export class NewPackageComponent implements OnInit {
  lessonForm : FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    targetAudience: ['', Validators.required],
    duration:['', [Validators.required, Validators.min(0)]],
    tags: ['']
  });
  tagForm :FormGroup = this.formBuilder.group({
    newTag: ['', [Validators.required, Validators.pattern(/\S/)]],
    selectTag: ['']
  });
  errorMessage: string = '';
  tagsTab : Tag[] = [];
  selectedTags : any = null;
  constructor(private formBuilder: FormBuilder, private httpFacadeService : HttpFacadeService, private authService : AuthService) {
  }
  ngOnInit() {
    this.httpFacadeService.getTags().subscribe((tags) => this.tagsTab=tags);
  }
  onCreatePackage() {
    let createdPackageId : number = 0;
    this.selectedTags = this.tagForm.value.selectTag;
    this.httpFacadeService.postNewLearningPackage(
        this.lessonForm.value.title,
        this.lessonForm.value.description,
        this.lessonForm.value.category,
        this.lessonForm.value.targetAudience,
        this.lessonForm.value.duration,
        this.authService.session.userId).subscribe({
      next: (learningPackage) => {
        createdPackageId = learningPackage.packageId;
        this.lessonForm.reset();
        if (this.selectedTags.length > 0) {
          const observables = this.selectedTags.map((tags: Tag) => this.httpFacadeService.postPackageTag(createdPackageId, tags.tagId));
          forkJoin(observables).subscribe();
        }
      },
    });
  }
  onCreateTag() : void{
    if(this.tagsTab.some(tag => tag.englishKeyword.toLowerCase() !== this.tagForm.value.newTag.toLowerCase()))
    {
      this.httpFacadeService.postTag(
        this.tagForm.value.newTag).subscribe({
        next: () => {
          this.tagForm.reset();
          this.httpFacadeService.getTags().subscribe((tags) => this.tagsTab=tags)
        },
      });
    }
    else {
      this.errorMessage = 'Tag has already been created';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }
}
