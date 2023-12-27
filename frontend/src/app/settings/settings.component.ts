import {Component, inject, OnInit} from '@angular/core';
import {HttpFacadeService, user} from "../http-facade.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { SettingsDeactivateModalComponent } from "../settings-deactivate-modal/settings-deactivate-modal.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private modalService = inject(NgbModal);
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

  open() {
    const modalRef = this.modalService.open(SettingsDeactivateModalComponent, { centered: true });
    modalRef.componentInstance.setUserPseudo(this.user.pseudo);
    modalRef.componentInstance.setUserId(this.user.userId);
  }

  changePassword() {
    // Implement the change password logic
  }
}
