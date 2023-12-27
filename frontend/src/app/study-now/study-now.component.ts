import { Component } from '@angular/core';
import {LearningFact} from "../http-facade.service";

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
  testLearningFact: LearningFact = {
    factId: 1,
    front: 'Front Content',
    back: 'Back Content',
    source: 'Source Info',
    relatedImage: 'Image URL',
    relatedLink: '5',
    isActive: true,
    packageId: 123,
    creatorId: 456,
  };
  showBack = false;

}
