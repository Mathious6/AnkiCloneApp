import { Component, OnInit } from '@angular/core';
import { HttpFacadeService } from "../../http-facade.service";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userPicture: string = '';

  constructor(private httpFacadeService: HttpFacadeService, private authService: AuthService) {
  }

  ngOnInit() {
    // Set the userPicture after component initialization
    this.userPicture = this.authService.session?.profilePicture || 'assets/images/default_user_image.png';
  }

  logout() {
    this.authService.logout();
  }
}
