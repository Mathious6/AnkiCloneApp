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
    recto: ['', Validators.required],
    verso: ['', Validators.required],
    image: [''],
    url: [''],
    source: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private httpFacadeService : HttpFacadeService, private router: Router, private authService : AuthService) {
  }
  ngOnInit(){
    this.httpFacadeService.getPackageCreatorId(this.authService.session.userId).subscribe({
      next: learningPackages => this.existingLearningPackages = learningPackages,
    });
  }
  onCreate() {
    if (this.factForm.valid) {
      this.httpFacadeService.postNewLearningFact(
        this.capitalizeFirstLetter(this.factForm.value.front),
        this.factForm.value.back,
        this.factForm.value.source,
        this.factForm.value.image,
        this.factForm.value.url,
        this.factForm.get('selectedPackage')?.value.packageId,
        this.authService.session.userId).subscribe({
        next: (value) => this.factForm.reset(),
      });
    }
  }
  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
