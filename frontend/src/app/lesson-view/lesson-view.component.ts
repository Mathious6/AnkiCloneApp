import {Component, HostBinding, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpFacadeService, LearningFact, UserLearningFact} from "../http-facade.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
  animations: [
    trigger('flip', [
      state('front', style({ transform: 'rotateY(0deg)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front <=> back', animate('{{ duration }} ease')),
    ]),
  ],
})
export class LessonViewComponent implements OnInit{
  cardState: 'front' | 'back' = 'front';
  userId: string = '';
  packageId: number = 0;
  packageFacts: LearningFact[] = [];
  currentFactCounter: number = 0;
  animationDuration = '0.5s'; // Default animation duration
  currentUserLearningFact: UserLearningFact | undefined;
  currentConfidenceLevelMap: { '1': string; '2': string; '3': string; [key: string]: string } = {
    '1': 'Hard',
    '2': 'Good',
    '3': 'Easy',
    'undefined': 'To define', // Provide a default value for undefined
  };
  isPreviousButtonDisabled: boolean = true;
  isNextButtonDisabled: boolean = false;
  constructor(private route : ActivatedRoute, private httpFacadeService : HttpFacadeService) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.userId = params['userId'];
        this.packageId = params['packageId'];
        this.httpFacadeService.getAllLearningFactByPackageId(this.packageId).subscribe({
          next: packageFact => {
            this.packageFacts = packageFact;
            this.setCurrentUserLearningFact();
          }
        });
        },
    });
  }

  setCurrentUserLearningFact(){
    this.httpFacadeService.getUserLearningPackage(this.userId, this.packageFacts[this.currentFactCounter].factId).subscribe({
      next: userLearningFact => {
        this.currentUserLearningFact = userLearningFact
      },
    });
  }
  toggleFlip() {
    this.cardState = this.cardState === 'front' ? 'back' : 'front';
  }

  previousFact() {
    this.setAnimationDuration('0s'); // Set duration to 0 for immediate change
    this.cardState = "front";
    this.currentFactCounter = Math.max(0, this.currentFactCounter - 1);
    this.setCurrentUserLearningFact();
    setTimeout(() => {
      this.setAnimationDuration('0.5s');
    }, 10);
    this.isPreviousButtonDisabled = this.currentFactCounter === 0;
    this.isNextButtonDisabled = this.currentFactCounter === this.packageFacts.length-1;
  }

  nextFact() {
    this.setAnimationDuration('0s'); // Set duration to 0 for immediate change
    this.cardState = "front";
    this.currentFactCounter = Math.min(this.packageFacts.length - 1, this.currentFactCounter + 1);
    this.setCurrentUserLearningFact();
    setTimeout(() => {
      this.setAnimationDuration('0.5s');
    }, 10);
    this.isPreviousButtonDisabled = this.currentFactCounter === 0;
    this.isNextButtonDisabled = this.currentFactCounter === this.packageFacts.length-1;
  }
  setAnimationDuration(duration: string) {
    this.animationDuration = duration;
  }

  reviewCard(confidenceLevel: number) {
    this.httpFacadeService.reviewUserLearningFact(this.userId, this.packageFacts[this.currentFactCounter].factId, confidenceLevel).subscribe(
      {
        next: userLearningFact =>{
          this.currentUserLearningFact = {
            userLearningFactId: userLearningFact.userLearningFactId,
            reviewCount: userLearningFact.reviewCount,
            confidenceLevel: userLearningFact.confidenceLevel,
            lastReviewed: userLearningFact.lastReviewed,
            nextReviewDate: userLearningFact.nextReviewDate,
            factId: userLearningFact.factId,
            userId: userLearningFact.userId
            }
          },
      }
    );
  }
}
