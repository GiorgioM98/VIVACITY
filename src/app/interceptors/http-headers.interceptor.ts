import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { User } from '../modelli/user.model';



@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  constructor() { }

  user!: User;


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    if (!localStorage) {
      return next.handle(req);
    }

    // Per tutte le altre richieste
    if (typeof localStorage !== 'undefined') {
      let user = localStorage.getItem('user');

      // Parsiamo user dal local storage (essendo prima stringify)
      this.user = user ? JSON.parse(user) : null;

      // Ricaviamo la costante auth_token da userRegistrazione o da user
      const auth_token = this.user?.auth_token;

      if (auth_token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${auth_token}`,
          },
        });
      }
    } else {
      console.error('local storage non definito');
    }

    return next.handle(req);
  }
}
