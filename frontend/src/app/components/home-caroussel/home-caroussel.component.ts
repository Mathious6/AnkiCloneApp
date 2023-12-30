import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-home-caroussel',
  templateUrl: './home-caroussel.component.html',
  styleUrls: ['./home-caroussel.component.css']
})
export class HomeCarousselComponent implements OnInit{
  isLoggedIn: boolean = this.authService.session !== null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.session !== null;
  }

}
