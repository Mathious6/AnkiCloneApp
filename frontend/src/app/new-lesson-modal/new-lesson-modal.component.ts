import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpFacadeService} from "../http-facade.service";

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
  constructor(private httpFacadeService : HttpFacadeService) {
  }
  setUserId(userId: number) {
    this.userId = userId;
  }
  setUserPackage(packageIds: number[]) {
    this.packageIds = packageIds;
  }
  ngOnInit() {
    this.httpFacadeService.getAllLearningPackage().subscribe({
      next: learningPackages => {
        this.newLearningPackage = learningPackages
          .filter(learningPackage => !this.packageIds.includes(learningPackage.packageId))
          .sort((a, b) => a.title.localeCompare(b.title));
        this.filteredLearningPackage = this.newLearningPackage;
      }
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

  handleSearchInput(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredLearningPackage = this.newLearningPackage; // Display all packages if search term is empty
    } else {
      try {
        const searchRegex = new RegExp(this.searchTerm, 'i'); // 'i' for case-insensitive
        this.filteredLearningPackage = this.newLearningPackage.filter((item) =>
          this.matchSearchTerm(item, searchRegex)
        );
      } catch (e) {
        // Handle invalid regex pattern
        this.filteredLearningPackage = [];
      }
    }
  }

// Function to check if an item matches the search term
  matchSearchTerm(item: any, regex: RegExp): boolean {
    // Implement your matching logic here
    // For example, you can check if any property of the item matches the regex
    return (
      item.title.match(regex) ||
      item.description.match(regex) ||
      item.category.match(regex) ||
      item.targetAudience.match(regex)
    );
  }

}
