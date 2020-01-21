import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6TZjMBtbMQ7Di30cSBbm5aUIxoKNTvYA', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorRes => {
          let errorMsg = 'An error occurred!';
          if(!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
          }
          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'The email you entered already exists!';
          }
          return throwError(errorMsg);
      }));
  }


  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6TZjMBtbMQ7Di30cSBbm5aUIxoKNTvYA', 
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }

}