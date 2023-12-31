import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, LearningFact, LearningPackage, Tag} from "../http-facade.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-delete-fact-package',
  templateUrl: './delete-fact-package.component.html',
  styleUrls: ['./delete-fact-package.component.css']
})
export class DeleteFactPackageComponent implements OnInit{
  deletePackageFact : FormGroup = this.formBuilder.group({
    selectedPackage: ['',Validators.required],
    selectedFact: ['']
  });
  deleteTag : FormGroup = this.formBuilder.group({
    selectedTag: ['',Validators.required]
  });
  existingLearningPackages: LearningPackage[] = [];
  existingLearningFacts: LearningFact[] = [];
  existingTags: [Tag[]] = [[]];
  constructor(private formBuilder: FormBuilder, private httpFacadeService : HttpFacadeService, private authService : AuthService){
  }
  ngOnInit() {
    this.httpFacadeService.getPackageCreatorId(this.authService.session.userId).subscribe({
      next: learningPackages => {
        this.existingLearningPackages = learningPackages
        this.existingLearningPackages.map((learningPackage: LearningPackage, index) => {
          this.httpFacadeService.getPackageTag(learningPackage.packageId).subscribe({
            next: tags => this.existingTags[index] = tags,
          });
        });
      },
    });
  }
  onDeletePackageFact() {
    if (this.deletePackageFact.value.selectedFact === '') {
      this.httpFacadeService.deleteLearningPackage(this.deletePackageFact.value.selectedPackage).subscribe({
        next: () => window.location.reload(),
      });
    }
    else {
      this.httpFacadeService.deleteLearningFact(this.deletePackageFact.value.selectedFact).subscribe({
        next: () => window.location.reload(),
      });
    }
  }
  onSelectPackage() {
    this.httpFacadeService.getAllLearningFactByPackageId(this.deletePackageFact.value.selectedPackage).subscribe({
      next: learningFacts => this.existingLearningFacts = learningFacts,
    });
  }
  onDeleteTag() {
    this.httpFacadeService.deleteTagById(this.deleteTag.value.selectedTag).subscribe({  next: () => window.location.reload(),});
  }
}
