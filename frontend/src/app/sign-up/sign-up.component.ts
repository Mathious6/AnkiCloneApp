import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SharedService} from "../shared.service";
import {HttpFacadeService} from "../http-facade.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  errorMessage: string = '';

  constructor(
    private httpFacadeService : HttpFacadeService,
    private fb: FormBuilder, private router : Router,
    private authService : AuthService,
    private sharedService : SharedService){
  }

  signup() {
    if (this.form.valid) {
      this.httpFacadeService.getAllUsers().subscribe({
        next: allUsers => {
          const existingUsername = allUsers.some(user => user.pseudo === this.form.value.username || user.mail === this.form.value.mail);
          if (existingUsername) this.errorMessage = "This username or email is already used, please choose another one !"
          else{
            this.httpFacadeService.createUser(this.form.value.username, this.form.value.mail, this.form.value.password).subscribe({
              next: createdUser => {
                this.authService.login(this.form.value.username, this.form.value.password)
                  .subscribe(() => {
                    this.router.navigate(['/home'])
                      .then(() => {
                        window.location.reload();
                      });
                  });
              },
            });
          }
        },
      });
    } else this.errorMessage = 'Please fill out the form correctly.';
    setTimeout(() => {
      this.errorMessage = ''; // Clear error message after a delay
    }, 3000);
  }
  get mailControl() {
    return this.form.get('mail');
  }
  isInvalidMail() {
    return this.mailControl?.hasError('email') && this.mailControl?.touched;
  }
}
