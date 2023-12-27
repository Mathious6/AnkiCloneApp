import { Component } from '@angular/core';
import {LearningFact} from "../model/LearningFact";
import {LearningPackage} from "../model/LearningPackage";
import {LearningPackageTag} from "../model/LearningPackageTag";
import {Tag} from "../model/Tag";
import {User} from "../model/User";
import {UserLearningFact} from "../model/UserLearningFact";
import {userLearningPackage} from "../model/userLearningPackage";
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

