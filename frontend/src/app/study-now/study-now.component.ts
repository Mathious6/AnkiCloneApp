import {Component, Input} from '@angular/core';
import {LearningFact} from "../model/LearningFact";
import {LearningPackage} from "../model/LearningPackage";
import {LearningPackageTag} from "../model/LearningPackageTag";
import {Tag} from "../model/Tag";
import {User} from "../model/User";
import {UserLearningFact} from "../model/UserLearningFact";
import {userLearningPackage} from "../model/userLearningPackage";
import {HttpFacadeService} from "../http-facade.service";

@Component({
  selector: 'app-study-now',
  templateUrl: './study-now.component.html',
  styleUrls: ['./study-now.component.css']
})
export class StudyNowComponent {
  public lf : LearningFact[] = [];
  public currentFactFront : string = '';
  public currentFactBack : string = '';
  public index : number = 0;
  testLearningFact: LearningFact = new LearningFact(
    1,
    'Front Content',
    'Back Content',
    'Source Info',
    'Image URL',
    5,
    true,
    123,
    456
  );
  showBack = false;

  toggleBack() {
    this.showBack = !this.showBack;
  }
}
