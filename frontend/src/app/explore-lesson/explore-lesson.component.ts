import {Component, inject, OnInit} from '@angular/core';
import {HttpFacadeService, tag} from "../http-facade.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LessonModalComponent} from "../lesson-modal/lesson-modal.component";
import {NewLessonModalComponent} from "../new-lesson-modal/new-lesson-modal.component";
import {forkJoin, map, switchMap} from "rxjs";
@Component({
    selector: 'app-explore-lesson',
    templateUrl: './explore-lesson.component.html',
    styleUrls: ['./explore-lesson.component.css']
})

export class ExploreLessonComponent implements OnInit{
  userLearningPackages : { title : string, description:string, packageId: number, progress:number, tags: tag[] }[] = []
  private modalService = inject(NgbModal);
  filteredLearningPackage: { title : string, description:string, packageId: number, progress:number, tags: tag[] }[]  = [];
  searchTerm: string = '';
  constructor(private httpFacadeService : HttpFacadeService, private router: Router, private authService : AuthService) {
  }
  ngOnInit() {
    this.httpFacadeService.getAllUserLearningPackage(this.authService.session.userId).pipe(
      switchMap((learningPackages) => {
        const observablesTags = learningPackages.map((learningPackage: { packageId: number }) =>
          this.httpFacadeService.getPackageTag(learningPackage.packageId)
        );
        return forkJoin(observablesTags).pipe(
          map((tagsArray: any) => {
            return learningPackages.map((learningPackage: any, index: string | number) => ({
              ...learningPackage,
              tags: tagsArray[index],
            }));
          })
        );
      })
    ).subscribe({
      next: (userLearningPackages) => {
        userLearningPackages.sort((a: { title: string; }, b: { title: any; }) => a.title.localeCompare(b.title));
        this.filteredLearningPackage = this.userLearningPackages = userLearningPackages;
      },
    });
  }
  startPackage(packageId: number, packageName:string) {
    this.router.navigate(['/study-now'], {
      queryParams: {
        userId: this.authService.session.userId,
        packageId: packageId,
        packageName: packageName
      }
    }).then();
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
    const modalRef = this.modalService.open(NewLessonModalComponent, { centered: true, size: 'lg', scrollable: true });
    modalRef.componentInstance.setUserId(this.authService.session.userId);
    modalRef.componentInstance.setUserPackage(this.userLearningPackages.map(userPackages => userPackages.packageId));
  }
  handleSearchInput(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredLearningPackage = this.userLearningPackages;
    } else {
      try {
        const searchRegex = new RegExp(this.searchTerm, 'i');
        this.filteredLearningPackage = this.userLearningPackages.filter((item) =>
          this.matchSearchTerm(item, searchRegex)
        );
      } catch (e) {
        this.filteredLearningPackage = [];
      }
    }
  }
  matchSearchTerm(item: any, regex: RegExp): boolean {
    return (
      item.title.match(regex) ||
      item.description.match(regex));
  }
}

