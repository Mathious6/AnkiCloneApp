import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { SharedService } from "../shared.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
    form: FormGroup = this.formBuilder.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
    });
    errorMessage: string = '';
    successMessage: string = '';
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private sharedService: SharedService) {}
    changePassword() {
        const { currentPassword, newPassword, confirmPassword } = this.form.value;
        const currentUser = this.authService.session;
        if (currentUser.password !== currentPassword) {
            this.showErrorMessage('Current password didn\'t match your password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            this.showErrorMessage('Your new passwords don\'t match.');
            return;
        }
        if (newPassword === currentPassword) {
            this.showErrorMessage('Your new password should be different from your current one.');
            return;
        }
        this.authService.changePassword(newPassword).subscribe({
            next: value => {
                if (value) {
                    this.form.reset();
                    this.showSuccessMessage('Your password has been changed.');
                    this.sharedService.resetChangePassword();
                } else {
                    this.showErrorMessage('Your password hasn\'t been changed.');
                }
            },
        });
    }
    private showErrorMessage(message: string) {
        this.errorMessage = message;
        setTimeout(() => this.errorMessage = '', 3000);
    }
    private showSuccessMessage(message: string) {
        this.successMessage = message;
        setTimeout(() => this.successMessage = '', 3000);
    }
}
