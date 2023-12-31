import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpFacadeService, LearningPackage} from "../http-facade.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})

export class NewCardComponent implements OnInit{
  existingLearningPackages : LearningPackage[] = [];
  factForm : FormGroup = this.formBuilder.group({
    selectedPackage: ['',Validators.required],
    recto: ['', [Validators.required, Validators.minLength(3)]],
    verso: ['', [Validators.required, Validators.minLength(3)]],
    image: [''],
    url: [''],
    source: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private httpFacadeService : HttpFacadeService, private authService : AuthService) {
  }
  ngOnInit(){
    this.httpFacadeService.getPackageCreatorId(this.authService.session.userId).subscribe({
      next: learningPackages => this.existingLearningPackages = learningPackages,
    });
  }
  onCreate() {
    if (this.factForm.valid) {
      this.httpFacadeService.postNewLearningFact(
        this.capitalizeFirstLetter(this.factForm.value.recto),
        this.factForm.value.verso,
        this.factForm.value.source,
        this.factForm.value.image,
        this.factForm.value.url,
        this.factForm.value.selectedPackage,
        this.authService.session.userId).subscribe({
        next: () => this.factForm.reset(),
      });
    }
  }
  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
