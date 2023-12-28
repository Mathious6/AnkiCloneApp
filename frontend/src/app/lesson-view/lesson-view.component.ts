import {Component, HostBinding, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpFacadeService, LearningFact} from "../http-facade.service";
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
  constructor(private route : ActivatedRoute, private httpFacadeService : HttpFacadeService) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.userId = params['userId'];
        this.packageId = params['packageId'];
        this.httpFacadeService.getAllLearningFactByPackageId(this.packageId).subscribe({
          next: value => this.packageFacts = value,
        });
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
    setTimeout(() => {
      this.setAnimationDuration('0.5s');
    }, 10);
  }

  nextFact() {
    this.setAnimationDuration('0s'); // Set duration to 0 for immediate change
    this.cardState = "front";
    this.currentFactCounter = Math.min(this.packageFacts.length - 1, this.currentFactCounter + 1);
    setTimeout(() => {
      this.setAnimationDuration('0.5s');
    }, 10);
  }
  setAnimationDuration(duration: string) {
    this.animationDuration = duration;
  }
}
