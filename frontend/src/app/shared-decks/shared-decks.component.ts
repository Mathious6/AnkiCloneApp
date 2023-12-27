import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpFacadeService, LearningPackage} from "../http-facade.service";

@Component({
  selector: 'app-shared-decks',
  templateUrl: './shared-decks.component.html',
  styleUrls: ['./shared-decks.component.css']
})


export class SharedDecksComponent {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpFacadeService: HttpFacadeService) {
    this.searchForm = this.formBuilder.group({
      title: [''],
      description: [''],
      category: [''],
    });
  }

  public lp: LearningPackage[] = [];

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
