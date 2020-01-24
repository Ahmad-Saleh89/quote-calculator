import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode = true;
  isLoading = false;
  errorMsg: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.autoLogin();
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    // To show the spinner
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if(this.loginMode) {
      authObs = this.authService.login(email, password);
    }else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      response => {
        // If every thing went right:
        this.isLoading = false;
        this.router.navigate(['/special']);
      },
      errorMessage => {
        this.errorMsg = errorMessage;
        this.isLoading = false;
      });
      
    form.reset();
  }
}