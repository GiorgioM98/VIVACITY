import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../modelli/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  urlRegistrazione = 'https://gorest.co.in/public/v2/users';


  user: User | undefined;
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  // creazione user dopo login
  createUser(name: string, gender: string, email: string, status: string, auth_token: string, id: number) {
    this.user = new User(name, gender, email, status, auth_token, id);
    this.isLoggedIn = true;
  }

  // registrazione
  registrazione(body: {}, auth_token: string) {
    const headers = {
      Authorization: `Bearer ${auth_token}`,
    };
    return this.http.post(this.urlRegistrazione, body, { headers }).pipe(tap(() => {
      this.router.navigate(['/login']);
    }));
  }


  login(auth_token: string): Observable<any> {
    const headers = {
      Authorization: `Bearer ${auth_token}`,
    };

    return this.http.get(this.urlRegistrazione, { headers });
  }



  // logout
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.user = undefined;
    this.router.navigate(['/login']);
  }
}
