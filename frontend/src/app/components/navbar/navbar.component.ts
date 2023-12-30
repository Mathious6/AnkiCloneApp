import {Component , OnInit} from '@angular/core';
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  userPicture: string = '';
  isLoggedIn: boolean = this.authService.session !== null;
  constructor(private authService: AuthService) {
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.session !== null;
    this.userPicture = this.authService.session?.profilePicture || 'assets/images/default_user_image.png';
  }
  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    window.location.reload();
  }
}
