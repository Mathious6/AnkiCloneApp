import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpFacadeService, Tag} from "../http-facade.service";
import {forkJoin, map, switchMap} from "rxjs";

@Component({
  selector: 'app-new-lesson-modal',
  templateUrl: './new-lesson-modal.component.html',
  styleUrls: ['./new-lesson-modal.component.css']
})
export class NewLessonModalComponent implements OnInit{
  modal = inject(NgbActiveModal);
  userId: number = 0;
  packageIds: number[] = [];
  newLearningPackage : { packageId: number, title : string, description:string, category: string, targetAudience: string, duration: number }[] = []
  filteredLearningPackage: any[] = [];
  searchTerm: string = '';
  selectedTagId: number | null = null;
  filteredTags: Tag[] = [];
  constructor(private httpFacadeService : HttpFacadeService) {
  }
  setUserId(userId: number) {
    this.userId = userId;
  }
  setUserPackage(packageIds: number[]) {
    this.packageIds = packageIds;
  }
  ngOnInit() {
    this.httpFacadeService.getAllLearningPackage().pipe(
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
        this.filteredLearningPackage = this.newLearningPackage = userLearningPackages;
      },
    });
  }
  startUserPackage(packageId: number) {
    this.httpFacadeService.startUserLearningPackage(this.userId, packageId).subscribe({
      next: () => {
        this.modal.close();
        window.location.reload();
      }
    });
  }
  matchSearchTerm(item: any, regex: RegExp): boolean {
    return (
      item.title.match(regex) ||
      item.description.match(regex));
  }
  applyFilters(): void {
    const searchRegex = this.searchTerm.trim() !== '' ? new RegExp(this.searchTerm, 'i') : null;
    this.filteredLearningPackage = this.newLearningPackage.filter((item) => {
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
