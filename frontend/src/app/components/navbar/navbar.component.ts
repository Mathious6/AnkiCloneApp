import {Component} from '@angular/core';
import {HttpFacadeService} from "../../http-facade.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed: boolean = true;

  constructor(private httpFacadeService: HttpFacadeService) {

  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  getTags(): void {
    this.httpFacadeService.getTags().subscribe((data) => {
      console.log(data);
    })
  }
}
