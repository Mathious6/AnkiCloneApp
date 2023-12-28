import {Component, OnInit} from '@angular/core';
import {HttpFacadeService, LearningPackage} from "../http-facade.service";
@Component({
    selector: 'app-explore-lesson',
    templateUrl: './explore-lesson.component.html',
    styleUrls: ['./explore-lesson.component.css']
})

export class ExploreLessonComponent implements OnInit{
  userLearningPackages : { title : string, description:string }[] = [
    {title: 'Angular Basics', description: 'Learn the fundamentals of Angular framework.'},
    {title: 'React Crash Course', description: 'A quick guide to understanding React.js.'},
    {title: 'Node.js for Beginners', description: 'Get started with server-side JavaScript using Node.js.'},
    {title: 'Angular Basics', description: 'Learn the fundamentals of Angular framework.'},
    {title: 'React Crash Course', description: 'A quick guide to understanding React.js.'},
    {title: 'Node.js for Beginners', description: 'Get started with server-side JavaScript using Node.js.'},
    {title: 'Angular Basics', description: 'Learn the fundamentals of Angular framework.'},
    {title: 'React Crash Course', description: 'A quick guide to understanding React.js.'},
    {title: 'Node.js for Beginners', description: 'Get started with server-side JavaScript using Node.js.'}
  ]
  constructor(private httpFacadeService : HttpFacadeService) {
  }


  ngOnInit(){
    /*
    this.httpFacadeService.getAllUserLearningPackage().subscribe({
      next: learningPackages =>{
        this.userLearningPackages = learningPackages.map(learningPackage => ({
          title: learningPackage.title,
          description: learningPackage.description,
        }));
      } ,
      }
    )*/
  }

  startPackage(title: string) {

  }
}

