import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { User } from '../modelli/user.model';
import { UserRegistrazione } from '../modelli/userRegistrazione.model';


@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  user!: User;
  userRegistrazione!: UserRegistrazione;

  constructor() { }

  // intercetta le chiamate HTTP e aggiunge l'header Authorization
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const firebaseUrl = 'https://identitytoolkit.googleapis.com';

    if (req.url.includes(firebaseUrl)) {
      // Non aggiungere l'header Authorization se l'URL è di Firebase
      return next.handle(req);
    }

    if (typeof localStorage !== 'undefined') {
      let userRegistrazione = localStorage.getItem('userRegistrazione');

      // parsiamo user dal local storage (essendo prima stringify)
      this.userRegistrazione = JSON.parse(userRegistrazione!);
    } else {
      console.error('local storage non definito');
    }

    // ricaviamo la costante auth_token
    const auth_token = this.userRegistrazione?.auth_token;
    // prendiamo user dal local storage
    if (auth_token) {
      req = req.clone({
        // imposta l'header Authorization
        setHeaders: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
    }
    return next.handle(req);
  }
}
