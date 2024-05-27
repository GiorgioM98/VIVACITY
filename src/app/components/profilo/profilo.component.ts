import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../../modelli/user.model';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserRegistrazione } from '../../modelli/userRegistrazione.model';
import { GoRestService } from '../../servizi/go-rest.service';
import { NgForm } from '@angular/forms';
import { NgIfContext } from '@angular/common';
@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.css'
})
export class ProfiloComponent {
  commentoForm: any;


  constructor(private authService: AuthService, private router: Router, private goRest: GoRestService) { }

  user: User = {} as User
  userRegistrazione: UserRegistrazione = {} as UserRegistrazione
  posts: any[] = [];
  noPosts!: TemplateRef<NgIfContext<boolean>> | null;
  noComments!: TemplateRef<NgIfContext<boolean | 0 | undefined>> | null;

  displayName!: string
  email!: string
  auth_token!: string
  commenti: { [postId: number]: any[] } = {};


  ngOnInit(): void {
    if(typeof localStorage !== 'undefined') {
      // prendiamo user dal local storage
      const userRegistrazioneData = localStorage.getItem('userRegistrazione');
      if (userRegistrazioneData) {
        this.userRegistrazione = JSON.parse(userRegistrazioneData);
        if (this.userRegistrazione && this.userRegistrazione.name) {
          this.caricaPostUtente();
        } else {
          console.error('Dati utente mancanti nel local storage');
        }
      } else {
        console.error('Dati utente non trovati nel local storage');
      }
    }else {
      console.error('Local storage non definito');
    }
  }

  // carica post utente
  caricaPostUtente(): void {
    this.goRest.caricaPostUtente(this.userRegistrazione.id)?.subscribe(
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
    const userRegistrazioneData = localStorage.getItem('userRegistrazione');
    if (userRegistrazioneData) {
      this.userRegistrazione = JSON.parse(userRegistrazioneData);
    }

    const commentData = {
      name: this.userRegistrazione.name,
      email: this.userRegistrazione.email,
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
