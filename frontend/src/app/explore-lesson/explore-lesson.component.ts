import { Component } from '@angular/core';

import {LearningPackage} from "../http-facade.service";
@Component({
    selector: 'app-explore-lesson',
    templateUrl: './explore-lesson.component.html',
    styleUrls: ['./explore-lesson.component.css']
})

export class ExploreLessonComponent {
  private httpFacadeService: any;
  public lp : LearningPackage[] = [];

  getPackage(): void {
    this.httpFacadeService.getAllLearningPackage().subscribe((data: LearningPackage[]) => {
      this.lp = data;
    })
  }
}

