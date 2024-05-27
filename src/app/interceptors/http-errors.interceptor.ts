import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Si è verificato un errore.';
        if (error.status === 404) {
          errorMessage = 'Risorsa non trovata.';
        } else if (error.status === 500) {
          errorMessage = 'Errore interno del server.';
        }
        return throwError(new Error(errorMessage));
      })
    );
  }
}
