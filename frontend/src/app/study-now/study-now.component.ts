import {Component, OnInit} from '@angular/core';
import {HttpFacadeService, LearningFact} from "../http-facade.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-study-now',
  templateUrl: './study-now.component.html',
  styleUrls: ['./study-now.component.css']
})
export class StudyNowComponent implements OnInit{
  userId : string = '';
  packageId : string = '';
  packageName : string = '';
  userFacts : { front: string; relatedImage: string, lastReviewed: Date; reviewCount: number}[] = [];
  emptyPackage: boolean = false;

  constructor(private route: ActivatedRoute, private httpFacadeService : HttpFacadeService, private router : Router, private authService : AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe({
      next: params => {
          this.userId = params['userId'];
          this.packageId = params['packageId'];
          this.packageName = params['packageName'];
        }
    });
    this.httpFacadeService.getOverviewUserLearningPackage(this.userId, this.packageId).subscribe({
      next: userFacts => {
        this.userFacts = userFacts.map((userFact: { front: string; relatedImage: string, lastReviewed: Date; reviewCount: number; }) => ({
          front: userFact.front,
          relatedImage: userFact.relatedImage,
          lastReviewed: userFact.lastReviewed,
          reviewCount: userFact.reviewCount,
        }));
        if (this.userFacts.length ===0){
          this.emptyPackage = true;
        }
      },
    });
  }

  startLesson(packageId: string) {
    this.router.navigate(['/lesson-view'], { queryParams: { userId : this.authService.session.userId, packageId: packageId } }).then(() => {
      window.location.reload();
    });

  }
}
