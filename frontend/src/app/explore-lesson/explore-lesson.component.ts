import {Component, inject, OnInit} from '@angular/core';
import {HttpFacadeService, LearningPackage} from "../http-facade.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {SettingsDeactivateModalComponent} from "../settings-deactivate-modal/settings-deactivate-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LessonModalComponent} from "../lesson-modal/lesson-modal.component";
import {NewLessonModalComponent} from "../new-lesson-modal/new-lesson-modal.component";
@Component({
    selector: 'app-explore-lesson',
    templateUrl: './explore-lesson.component.html',
    styleUrls: ['./explore-lesson.component.css']
})

export class ExploreLessonComponent implements OnInit{
  userLearningPackages : { title : string, description:string, packageId: number, progress:number }[] = []
  private modalService = inject(NgbModal);
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
        this.userLearningPackages.sort((a, b) => a.title.localeCompare(b.title));
      } ,
      });
  }

  startPackage(packageId: number, packageName:string) {
    this.router.navigate(['/study-now'], { queryParams: { userId : this.authService.session.userId, packageId: packageId, packageName: packageName} });
  }

  resetProgress(packageId: number, title: string) {
    const modalRef = this.modalService.open(LessonModalComponent, { centered: true });
    modalRef.componentInstance.setPackageId(packageId);
    modalRef.componentInstance.setUserId(this.authService.session.userId);
    modalRef.componentInstance.setPackageTitle(title);
    modalRef.componentInstance.setAction('reset the progress of');
  }

  deletePackage(packageId: number, title: string) {
    const modalRef = this.modalService.open(LessonModalComponent, { centered: true });
    modalRef.componentInstance.setPackageId(packageId);
    modalRef.componentInstance.setUserId(this.authService.session.userId);
    modalRef.componentInstance.setPackageTitle(title);
    modalRef.componentInstance.setAction('delete');
  }

  startLesson() {
    const modalRef = this.modalService.open(NewLessonModalComponent, { centered: true });
    modalRef.componentInstance.setUserId(this.authService.session.userId);
  }
}

