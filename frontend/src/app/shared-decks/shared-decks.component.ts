import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, LearningPackage, tag} from "../http-facade.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-shared-decks',
  templateUrl: './shared-decks.component.html',
  styleUrls: ['./shared-decks.component.css']
})


export class SharedDecksComponent implements OnInit{

  searchForm: FormGroup;
  tagsTab : tag[] = [];
  lp: LearningPackage[] = [];


  constructor(private formBuilder: FormBuilder, private httpFacadeService: HttpFacadeService) {
    this.searchForm = this.formBuilder.group({
      title: ['', Validators.required],
      tag: ['', Validators.required]
    });
  }

    ngOnInit() {
        this.httpFacadeService.getTags().subscribe((data) => {
            this.tagsTab=data;
        })
    }


  getSearchPackage(): void {
      const title = this.searchForm.get('title')?.value;
      const tag = this.searchForm.get('tag')?.value;
      if (title !== null && tag !== null) {
          console.error(title,tag);
          this.httpFacadeService.getSearchPackage(title, tag).subscribe((data: LearningPackage[]) => {
              this.lp = data;
          });
      } else {
          console.error("Title or tag is null.",title,tag);
      }

  }
}
