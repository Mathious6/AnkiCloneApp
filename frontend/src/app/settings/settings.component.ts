import {Component, inject, OnInit} from '@angular/core';
import {HttpFacadeService, user} from "../http-facade.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { SettingsDeactivateModalComponent } from "../settings-deactivate-modal/settings-deactivate-modal.component";
import {AuthService} from "../auth.service";
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  private modalService = inject(NgbModal);
  user: user = this.authService.session;
  isChangePasswordClicked: boolean = false;
  constructor(private authService: AuthService, private sharedService: SharedService) {}

  open() {
    const modalRef = this.modalService.open(SettingsDeactivateModalComponent, { centered: true });
    modalRef.componentInstance.setUserPseudo(this.user.pseudo);
    modalRef.componentInstance.setUserId(this.user.userId);
  }

  ngOnInit() {
    this.sharedService.changePasswordClick$.subscribe((clicked: boolean) => {
      this.isChangePasswordClicked = clicked;
    });
  }

  openChangePassword() {
    this.sharedService.openChangePassword();
  }
}
