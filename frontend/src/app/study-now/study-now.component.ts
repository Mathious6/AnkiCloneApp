import { Component } from '@angular/core';

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

}
