import {Component, inject, OnInit} from '@angular/core';
import {HttpFacadeService, Tag} from "../http-facade.service";
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
  userLearningPackages : { title : string, description:string, packageId: number, progress:number, tags: Tag[] }[] = []
  private modalService = inject(NgbModal);
  filteredLearningPackage: { title : string, description:string, packageId: number, progress:number, tags: Tag[] }[]  = [];
  searchTerm: string = '';
  filteredTags: Tag[] = [];
  selectedTagId: number | null = null;
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
            const allTags = tagsArray.flat();
            const uniqueTags = new Set(allTags.map((tag: Tag) => tag.englishKeyword.toLowerCase()));
            this.filteredTags = Array.from(uniqueTags).map((englishKeyword) => {
              return allTags.find((tag: Tag) => tag.englishKeyword.toLowerCase() === englishKeyword);
            });
            return learningPackages.map((learningPackage: any, index: string | number) => {
              learningPackage.tags = tagsArray[index] || [];
              return learningPackage;
            });
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
  matchSearchTerm(item: any, regex: RegExp): boolean {
    return (
      item.title.match(regex) ||
      item.description.match(regex));
  }
  applyFilters(): void {
    const searchRegex = this.searchTerm.trim() !== '' ? new RegExp(this.searchTerm, 'i') : null;
    this.filteredLearningPackage = this.userLearningPackages.filter((item) => {
      const matchesSearchTerm = !searchRegex || this.matchSearchTerm(item, searchRegex);
      const matchesTagFilter = this.selectedTagId === null || this.packageHasTag(item, this.selectedTagId);
      return matchesSearchTerm && matchesTagFilter;
    });
  }
  packageHasTag(item: any, tagId: number): boolean {
    return item.tags.some((tag: { tagId: number; }) => tag.tagId === tagId);
  }
  toggleTag(tagId: number): void {
    if (this.selectedTagId === tagId) {
      // Toggle off if the same tag is clicked again
      this.selectedTagId = null;
    } else {
      this.selectedTagId = tagId;
    }

    this.applyFilters();
  }
  resetFilters(): void {
    this.selectedTagId = null;
    this.applyFilters();
  }
}

