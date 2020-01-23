import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

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

  user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) { }

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

  logout() {
    this.user.next(null);
    this.router.navigate(['/home']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
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