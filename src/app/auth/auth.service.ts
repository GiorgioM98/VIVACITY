import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modelli/user.model';
import { tap } from 'rxjs';
import { UserRegistrazione } from '../modelli/userRegistrazione.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // end point e api key per registrazione su firebase
  API_KEY = 'AIzaSyBq_esU5MEoffF268SXITOie42ovTsJCEs';
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

  userRegistrazione: UserRegistrazione | undefined;
  user: User | undefined;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  // creazione user dopo login
  createUser(id: string, token: string, expirationDate: Date) {
    this.user = new User(id, token, expirationDate);
    this.isLoggedIn = true;
    }

  // creazione userRegistrazione dopo registrazione
  createUserRegistrazione(
    name: string,
    gender: string,
    email: string,
    status: string,
    auth_token: string,
    id: number
  ) {
    this.userRegistrazione = new UserRegistrazione(
      name,
      gender,
      email,
      status,
      auth_token,
      id
    );
    this.isLoggedIn = true;
  }

  // registrazione
  registrazione(email: string, password: string) {
    return this.http
      .post(this.signUpUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
  }

  // login
  login(email: string, password: string, auth_token: string) {
    return this.http
      .post(this.signInUrl, {
        email: email,
        password: password,
        auth_token: auth_token,
        returnSecureToken: true,
      })
      .pipe(
        tap(() => {
          this.router.navigate(['']);
        })
      );
  }

  // logout
  logout() {
    this.isLoggedIn = false;
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
