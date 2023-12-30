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
  filteredLearningPackage: any[] = [];
  searchTerm: string = '';
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
        this.filteredLearningPackage = this.userLearningPackages;
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
    const modalRef = this.modalService.open(NewLessonModalComponent, { centered: true, size: 'lg', scrollable: true });
    modalRef.componentInstance.setUserId(this.authService.session.userId);
    modalRef.componentInstance.setUserPackage(this.userLearningPackages.map(userPackages => userPackages.packageId));
  }

  handleSearchInput(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredLearningPackage = this.userLearningPackages; // Display all packages if search term is empty
    } else {
      try {
        const searchRegex = new RegExp(this.searchTerm, 'i'); // 'i' for case-insensitive
        this.filteredLearningPackage = this.userLearningPackages.filter((item) =>
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
      item.description.match(regex));
  }
}

