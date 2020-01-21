import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) { }

  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6TZjMBtbMQ7Di30cSBbm5aUIxoKNTvYA', 
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

}