import { Component } from '@angular/core';
import {LearningFact} from "../model/LearningFact";
import {LearningPackage} from "../model/LearningPackage";
import {LearningPackageTag} from "../model/LearningPackageTag";
import {Tag} from "../model/Tag";
import {User} from "../model/User";
import {UserLearningFact} from "../model/UserLearningFact";
import {userLearningPackage} from "../model/userLearningPackage";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shared-decks',
  templateUrl: './shared-decks.component.html',
  styleUrls: ['./shared-decks.component.css']
})


export class SharedDecksComponent {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      title: [''],
      description: [''],
      category: [''],
    });
  }

  private httpFacadeService: any;
  public lp : LearningPackage[] = [];

  getSearchPackage(): void {
    const titleControl = this.searchForm.get('title');
    const descriptionControl = this.searchForm.get('description');
    const categoryControl = this.searchForm.get('category');
    if (titleControl !== null && descriptionControl !== null && categoryControl !== null) {
      const title = titleControl.value;
      const description = descriptionControl.value;
      const category = categoryControl.value;
      this.httpFacadeService.getSearchPackage(title,description,category).subscribe((data: LearningPackage[]) => {
        this.lp = data;
      })
    }
  }
}
