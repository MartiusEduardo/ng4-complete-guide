import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router) {}

  error: string = null;
  authObs: Observable<AuthResponseData>;

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.authObs = this.authService.signIn(email, password);
    this.subscribeAuth();
  }

  onSignUp(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.authObs = this.authService.singUp(email, password);
    this.subscribeAuth();
    authForm.reset();
  }

  subscribeAuth() {
    this.authObs.subscribe(responseData => {
      console.log(responseData);
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
    });
  }

}
