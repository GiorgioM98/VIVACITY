import { Component, OnInit, TemplateRef } from '@angular/core';
import { GoRestService } from '../../servizi/go-rest.service';
import { NgIfContext } from '@angular/common';
import { NgForm } from '@angular/forms';
import { User } from '../../modelli/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreaNuovoPostComponent } from '../crea-nuovo-post/crea-nuovo-post.component';
import { UserRegistrazione } from '../../modelli/userRegistrazione.model';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  searchQuery: string = '';
  tipoRicerca: string = 'title'; // Default impostata su title
  postsFiltrati: any[] = []; // Array di utenti filtrati
  posts!: any[];
  commentoForm!: NgForm;
  noPosts!: TemplateRef<NgIfContext<boolean>> | null;
  noComments!: TemplateRef<NgIfContext<boolean | 0 | undefined>> | null;
  postId!: number;
  commenti: { [postId: number]: any[] } = {};
  post: any;
  user!: User;
  userRegistrazione!: UserRegistrazione;
  userName!: string;
  bottoneTitoloSelezionato = false;
  bottoneTestoSelezionato = false;

  pageSize = 25; // risultati per pagina
  pageIndex = 1; // Pagina corrente
  length = 3000; // Totale risultati
  pageSizeOptions = [5, 10, 25]; // Opzioni di paginazione
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  constructor(
    private goRest: GoRestService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.caricaListaPost();
  }

  // parametro ricerca
  impostaTipoRicerca(tipoRicerca: string): void {
    this.tipoRicerca = tipoRicerca;
    console.log(`tipo di ricerca:`, this.tipoRicerca);
    this.filtroPosts();
    this.bottoneTitoloSelezionato = tipoRicerca === 'title';
    this.bottoneTestoSelezionato = tipoRicerca === 'body';
  }

  // ricerca post
  filtroPosts(): void {
    const query = this.searchQuery.trim().toLowerCase();
    // Filtra i posts in base al tipo di ricerca
    if (this.tipoRicerca === 'title') {
      this.postsFiltrati = this.posts.filter((posts: any) =>
        posts.title.toLowerCase().includes(query)
      );
    } else if (this.tipoRicerca === 'body') {
      this.postsFiltrati = this.posts.filter((posts: any) =>
        posts.body.toLowerCase().includes(query)
      );
    }

    console.log(`posts filtrati:`, this.postsFiltrati);
  }

  // caricamento lista posts
  caricaListaPost(): void {
    this.goRest
      .listaPost(this.pageIndex, this.pageSize)
      .subscribe((data: any) => {
        console.log(`lista post:`, data);
        this.posts = data;
        this.postsFiltrati = this.posts;
        this.filtroPosts();

        const containerPosts = document.querySelector('.containerPosts');
        if (containerPosts) {
          containerPosts.scrollIntoView({ behavior: 'smooth' });
        }
      });
  }

  // caricamento commenti post in base all'id del post
  caricaCommentiPost(postId: number) {
    if (!this.commenti[postId]) {
      this.commenti[postId] = [];
    }
    this.goRest.caricaCommentiPost(postId).subscribe((data) => {
      this.commenti[postId] = data;
      console.log(`commenti post ${postId}:`, data);
    });
  }

  // invio commento in base all'id del post
  onSubmit(postId: number, commentoForm: NgForm): void {
    if (!postId || !commentoForm.value.commento) {
      console.error('post Id o commento mancante');
      return;
    }

    if(typeof localStorage !== 'undefined') {
      //url con id post
      const url = `https://gorest.co.in/public/v2/posts/${postId}/comments`;

      //prendiamo nome e email utente dal local storage
      const userRegistrazione = localStorage.getItem('userRegistrazione');
      this.userRegistrazione = JSON.parse(userRegistrazione!);

      const commentData = {
        name: this.userRegistrazione.name,
        email: this.userRegistrazione.email,
        body: commentoForm.value.commento,
      };

      this.goRest.caricaCommentoUtente(url, commentData).subscribe(
        (data) => {
          console.log('commento inviato', data);
          // ricarica pagina
          this.caricaCommentiPost(postId);
          commentoForm.reset();
        },
        (error) => {
          console.error('Errore invio commento', error);
        }
      );
    }else{
      console.error('dati utente mancanti nel local storage, rifare la registrazione');
      return;
    }
  }


  // apri crea post
  apriCreaPost(): void {
    // apertura componente crea nuovo post nel dialog
    const dialogRef = this.dialog.open(CreaNuovoPostComponent, {
      width: '60%',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog chiuso');
    });
  }

  // paginazione
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.caricaListaPost();
    console.log(`pageEvent:`, e);
  }
}
