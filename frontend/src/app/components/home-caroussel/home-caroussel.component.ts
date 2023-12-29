import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-home-caroussel',
  templateUrl: './home-caroussel.component.html',
  styleUrls: ['./home-caroussel.component.css']
})
export class HomeCarousselComponent implements OnInit{
  isLoggedIn: boolean = true;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.loginStatus$.subscribe((loginSuccess) => {
      this.isLoggedIn = !loginSuccess;
    });
  }

}
