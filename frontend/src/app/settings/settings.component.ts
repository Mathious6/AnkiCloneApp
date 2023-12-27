import {Component, inject, OnInit} from '@angular/core';
import {HttpFacadeService, user} from "../http-facade.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { SettingsDeactivateModalComponent } from "../settings-deactivate-modal/settings-deactivate-modal.component";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent{
  private modalService = inject(NgbModal);
  user: user = this.authService.session;
  constructor(private authService: AuthService, private httpFacadeService: HttpFacadeService) {}

  open() {
    const modalRef = this.modalService.open(SettingsDeactivateModalComponent, { centered: true });
    modalRef.componentInstance.setUserPseudo(this.user.pseudo);
    modalRef.componentInstance.setUserId(this.user.userId);
  }

  changePassword() {
    // Implement the change password logic
  }
}
