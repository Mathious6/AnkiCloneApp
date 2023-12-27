import {Component, OnInit} from '@angular/core';
import {HttpFacadeService, user} from "../http-facade.service";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: user = {
    userId: 0,
    mail: '',
    pseudo: '',
    password: '',
    registrationDate: new Date(),
    profilePicture: '',
    isActive: false
  };
  constructor(private httpFacadeService: HttpFacadeService) {}

  ngOnInit(): void {
    const userId = 1;
    this.httpFacadeService.getSpecificUser(userId).subscribe((userData) => {
      this.user = userData;
    })
  }

}
