import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'AnkiCloneApp';

  constructor() {
    console.log('AppComponent.constructor()')
  }

  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()')
  }
}
