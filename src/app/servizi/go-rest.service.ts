import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GoRestService {
  // servizio GoRest

  // url base
  base_url = 'https://gorest.co.in/public/v2/';

  constructor(private http: HttpClient, private authservice: AuthService, private httpClientModule: HttpClientModule) { }

  //crea nuovo utente
  creaNuovoUtente(body: {}): Observable<any> {
    const url = `${this.base_url}users`;
    return this.http.post(url, body);
  }

  //crea nuovo post
  creaNuovoPost(url: string, body: {}): Observable<any> {
    return this.http.post(url, body);
  }

  // prendi lista utenti
  listaUtenti(page: number, per_page: number): Observable<any> {
    const risultatiPerPagina = `${this.base_url}users?page=${page}&per_page=${per_page}`;
    return this.http.get(risultatiPerPagina);
  }

  // carica tutti i post dell'utente
  caricaPostUtente(utenteId: number): Observable<any> {
    const url = `${this.base_url}users/${utenteId}/posts`;
    return this.http.get(url);
  }

  // carica tutti i commenti dei post
  caricaCommentiPost(postId: number): Observable<any> {
    const url = `${this.base_url}posts/${postId}/comments`;
    return this.http.get(url);
  }

  // invia  commento utente
  caricaCommentoUtente(url: string, body: {}): Observable<any> {
    return this.http.post(url, body);
  }

  //prendi lista post
  listaPost(page: number, per_page: number): Observable<any> {
    const risultatiPerPagina = `${this.base_url}posts?page=${page}&per_page=${per_page}`;
    return this.http.get(risultatiPerPagina);
  }

  //elimina utente
  eliminaUtente(utenteId: number): Observable<any> {
    const url = `${this.base_url}users/${utenteId}`;
    return this.http.delete(url);
  }
}
