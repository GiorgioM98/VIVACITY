import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../../modelli/user.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { GoRestService } from '../../servizi/go-rest.service';
import { NgForm } from '@angular/forms';
import { NgIfContext } from '@angular/common';
@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {


  constructor(private router: Router, private goRest: GoRestService) { }

  commentoForm: any;
  user: User = {} as User
  posts: any[] = [];
  noPosts!: TemplateRef<NgIfContext<boolean>> | null;
  noComments!: TemplateRef<NgIfContext<boolean | 0 | undefined>> | null;

  email!: string
  auth_token!: string
  commenti: { [postId: number]: any[] } = {};


  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      // prendiamo user dal local storage
      const user = localStorage.getItem('user');
      if (user) {
        this.user = JSON.parse(user);
        if (this.user && this.user.name) {
          this.caricaPostUtente();
        } else {
          console.error('Dati utente mancanti nel local storage');
        }
      } else {
        console.error('errore');
      }
    } else {
      console.error('Local storage non definito');
    }
  }

  // carica post utente
  caricaPostUtente(): void {
    this.goRest.caricaPostUtente(this.user.id)?.subscribe(
      (data: any) => {
        console.log('Lista post:', data);
        this.posts = data;
      },
      (error) => {
        console.error('Errore nel caricamento dei post', error);
      }
    );
  }

  // commenti dei post con id specifico
  caricaCommentiPost(postId: number): void {
    if (!this.commenti[postId]) {
      this.commenti[postId] = [];
    }
    this.goRest.caricaCommentiPost(postId)?.subscribe(
      (data) => {
        this.commenti[postId] = data;
        console.log(`Commenti post ${postId}:`, data);
      },
      (error) => {
        console.error('Errore nel caricamento dei commenti', error);
      }
    );
  }

  // invio commento in base all'id del post
  onSubmit(postId: number, commentoForm: NgForm): void {
    if (!postId || !commentoForm.value.commento) {
      console.error('Post ID o commento mancante');
      return;
    }

    // Controllo se localStorage è definito
    if (typeof localStorage !== 'undefined') {
      // url con id post
      const url = `https://gorest.co.in/public/v2/posts/${postId}/comments`;

      // prendiamo nome e email utente dal local storage
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
      }

      const commentData = {
        name: this.user.name,
        email: this.user.email,
        body: commentoForm.value.commento,
      };

      if (!commentData.name || !commentData.email) {
        console.error('Dati utente mancanti nel local storage, rifare la registrazione');
        return;
      }

      this.goRest.caricaCommentoUtente(url, commentData)?.subscribe(
        (data) => {
          console.log('Commento inviato', data);
          // ricarica commenti del post
          this.caricaCommentiPost(postId);
          commentoForm.reset();
          this.commentoForm = commentoForm;
        },
        (error) => {
          console.error('Errore invio commento', error);
        }
      );
    } else {
      console.error('localStorage non è definito. Assicurati che il tuo browser supporti localStorage.');
    }
  }

}
