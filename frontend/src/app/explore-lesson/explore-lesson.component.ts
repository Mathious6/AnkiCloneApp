import { Component } from '@angular/core';

import {HttpFacadeService} from "../http-facade.service";

@Component({
    selector: 'app-explore-lesson',
    templateUrl: './explore-lesson.component.html',
    styleUrls: ['./explore-lesson.component.css']
})

export class ExploreLessonComponent {
  private httpFacadeService: any;
  public lp : LearningPackage[] = [];

  getPackage(): void {
    this.httpFacadeService.getPackage().subscribe((data: LearningPackage[]) => {
      this.lp = data;
    })
  }
}

