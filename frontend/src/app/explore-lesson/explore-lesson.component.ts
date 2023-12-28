import {Component, OnInit} from '@angular/core';
import {HttpFacadeService, LearningPackage} from "../http-facade.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
@Component({
    selector: 'app-explore-lesson',
    templateUrl: './explore-lesson.component.html',
    styleUrls: ['./explore-lesson.component.css']
})

export class ExploreLessonComponent implements OnInit{
  userLearningPackages : { title : string, description:string, packageId: number, progress:number }[] = []
  constructor(private httpFacadeService : HttpFacadeService, private router: Router, private authService : AuthService) {
  }


  ngOnInit(){
    this.httpFacadeService.getAllUserLearningPackage(this.authService.session.userId).subscribe({
      next: learningPackages =>{
        this.userLearningPackages = learningPackages.map((learningPackage: { title: string; description: string; packageId: number;progress: number; }) => ({
          title: learningPackage.title,
          description: learningPackage.description,
          packageId: learningPackage.packageId,
          progress: learningPackage.progress,
        }));
      } ,
      });
  }

  startPackage(packageId: number) {
    this.router.navigate(['/study-now'], { queryParams: { userId : this.authService.session.userId, packageId: packageId } });
  }
}

