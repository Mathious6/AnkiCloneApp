import {Component, OnInit} from '@angular/core';
import {LearningFact} from "../http-facade.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-study-now',
  templateUrl: './study-now.component.html',
  styleUrls: ['./study-now.component.css']
})
export class StudyNowComponent implements OnInit{
  userId : string = '';
  packageId : string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe({
      next: params => {
          this.userId = params['userId'];
          this.packageId = params['packageId'];
        }
    });
  }

}
