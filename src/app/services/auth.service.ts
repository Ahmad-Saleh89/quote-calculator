import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';
import { SpecialsService } from './specials.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService {

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private specialsService: SpecialsService) { }

  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6TZjMBtbMQ7Di30cSBbm5aUIxoKNTvYA', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          })
      );
  }


  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6TZjMBtbMQ7Di30cSBbm5aUIxoKNTvYA', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
          catchError(this.handleError),
          tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          })
      ); 
  }

  autoLogin() {
    // First: check if there is any user data in the local storage of the browser
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    // If NOT: then Do Not Auto Login
    if (!userData) {
      return;
    }
    // Otherwise: create a new user with the loaded data from the local storage
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token) { // Remember the get token method in user.model.ts
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  
  logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.specialsService.clearAll();
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log(expirationDate);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An error occurred!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'The email you entered already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'The email you entered does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'The password is incorrect!';
        break;
    }
    return throwError(errorMsg);
  }

}