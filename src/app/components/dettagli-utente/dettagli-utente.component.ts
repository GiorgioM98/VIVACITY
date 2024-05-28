import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoRestService } from '../../servizi/go-rest.service';
import { NgIfContext } from '@angular/common';
import { NgForm } from '@angular/forms';
import { User } from '../../modelli/user.model';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.component.html',
  styleUrl: './dettagli-utente.component.css',
})
export class DettagliUtenteComponent implements OnInit {

  @ViewChild('commentoForm')
  commentoForm!: NgForm;

  noPosts!: TemplateRef<NgIfContext<boolean>> | null;
  noComments!: TemplateRef<NgIfContext<boolean | 0 | undefined>> | null;
  posts: any[] = [];
  postId!: number;
  commenti: { [postId: number]: any[] } = {};
  post: any;
  user!: User;


  constructor(
    public dialogRef: MatDialogRef<DettagliUtenteComponent>,


    // uso di mat dialog per passare i dati e aprire un dialog
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private goRest: GoRestService
  ) { }



  ngOnInit(): void {
    this.caricaPostUtente();
  }

  // post utente
  caricaPostUtente(): void {
    this.goRest.caricaPostUtente(this.data.id)?.subscribe((data: any) => {
      console.log(`lista post:`, data);
      this.posts = data;
    });
  }


  // commenti dei post con id specifico
  caricaCommentiPost(postId: number) {
    if (!this.commenti[postId]) {
      this.commenti[postId] = [];
    }
    this.goRest.caricaCommentiPost(postId)?.subscribe((data) => {
      this.commenti[postId] = data;
      console.log(`commenti post ${postId}:`, data);
    });
  }


  onSubmit(postId: number, commentoForm: NgForm): void {
    // errore invio commento
    if (!postId || !commentoForm.value.commento) {
      console.error('post Id o commento mancante');
      return;
    }

    // url con id del post specifico
    const url = `https://gorest.co.in/public/v2/posts/${postId}/comments`;

    // prendiamo nome e email utente dal local storage
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      this.user = JSON.parse(user!);
    } else {
      console.error('local storage non definito');
    }

    if (!this.user || !this.user.name || !this.user.email) {
      console.error('dati utente mancanti nel local storage, rifare la registrazione');
      return;
    }

    const commentData = {
      name: this.user.name,
      email: this.user.email,
      body: commentoForm.value.commento,
    };

    // carica commento utente
    this.goRest.caricaCommentoUtente(url, commentData).subscribe(
      (data) => {
        console.log('commento inviato', data);
        // ricarica pagina
        this.caricaCommentiPost(postId);
        if (this.commentoForm) {
          this.commentoForm.resetForm();
          // this.commentoForm.resetForm();
        } else {
          console.error('errore reset form');
        }

      },
      (error) => {
        console.error('Errore invio commento', error);
      }
    );
  }

  chiudi(): void {
    this.dialogRef.close();
  }
}
