import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userPicture: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private sharedService : SharedService) {
  }

  ngOnInit() {
    // Set the userPicture after component initialization
    this.userPicture = this.authService.session?.profilePicture || 'assets/images/default_user_image.png';
    this.sharedService.loginStatus$.subscribe((loginSuccess) => {
      if (loginSuccess) {
        this.isLoggedIn = true;
        this.ngOnInit();
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.sharedService.notifyLoginStatusChanged(false);
  }
}
