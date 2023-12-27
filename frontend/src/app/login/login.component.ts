import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string = '';
  constructor(private authService: AuthService, private fb: FormBuilder, private router : Router){

  }
  login() {
    this.authService.login(this.form.value.username, this.form.value.password)
        .subscribe(([loginSuccess, userDeactivated]: [boolean, boolean]) => {
            if (!loginSuccess) {
                this.errorMessage = 'Invalid username/email or password!';
                setTimeout(() => {
                    this.errorMessage = ''; // Clear error message after a delay
                }, 3000);
            } else if (!userDeactivated) {
                this.errorMessage = 'The user is deactivated, please contact the admin to activate your account.';
                setTimeout(() => {
                    this.errorMessage = ''; // Clear error message after a delay
                }, 3000);
            } else {
                this.router.navigateByUrl('/home');
            }
        });
  }

}
