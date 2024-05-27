import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { GoRestService } from '../../servizi/go-rest.service';
import { MatDialog } from '@angular/material/dialog';
import { DettagliUtenteComponent } from '../dettagli-utente/dettagli-utente.component';
import { CreaNuovoUtenteComponent } from '../crea-nuovo-utente/crea-nuovo-utente.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchQuery: string = '';       // Stringa di ricerca utente
  tipoRicerca: string = 'name';  // Default impostata su nome
  utentiFiltrati: any[] = [];   // Array di utenti filtrati
  utenti: any[] = [];  // Array di utenti
  id!: number;
  bottoneNomeSelezionato: boolean = false;
  bottoneEmailSelezionato: boolean = false;

// paginazione
  pageSize = 25; // numero di utenti per pagina
  pageIndex = 1; // pagina iniziale
  length = 3000; // numero totale di utenti
  pageSizeOptions = [5, 10, 25]; // opzioni di numero di utenti per pagina
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  constructor(private goRest: GoRestService, public dialog: MatDialog, private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
    this.caricaListaUtenti();
  }

  // parametro ricerca
  impostaTipoRicerca(tipoRicerca: string): void {
    this.tipoRicerca = tipoRicerca;
    console.log(`tipo di ricerca:`, this.tipoRicerca);
    this.filtroUtenti();
    this.bottoneNomeSelezionato = tipoRicerca === 'name';
    this.bottoneEmailSelezionato = tipoRicerca === 'email';

  }

  // ricerca utenti
  filtroUtenti(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (this.tipoRicerca === 'name') {
      this.utentiFiltrati = this.utenti.filter((utente: any) => utente.name.toLowerCase().includes(query));
    } else if (this.tipoRicerca === 'email') {
      this.utentiFiltrati = this.utenti.filter((utente: any) => utente.email.toLowerCase().includes(query));
    }

    console.log(`utenti filtrati:`, this.utentiFiltrati);
  }

  // lista utenti
  caricaListaUtenti(): void {
    this.goRest.listaUtenti(this.pageIndex, this.pageSize)?.subscribe((data: any) => {
      this.utenti = data;
      console.log(`lista utenti:`, this.utenti);
      this.utentiFiltrati = this.utenti; // Inizializza utentiFiltrati con la lista completa all'avvio
    this.filtroUtenti(); // Applica il filtro iniziale
    // riporta la pagina in alto
    const containerUtenti = document.querySelector('.containerUtenti');
    if (containerUtenti) {
      containerUtenti.scrollIntoView({ behavior: 'smooth' });
    }
  });
  }

  // dettagli utente
  apriDettagliUtente(utente: any): void {
    // apertura componente dettagli utente e condivisione dei dati utente nel dialog
    const dialogRef = this.dialog.open(DettagliUtenteComponent, {
      width: '60%',
      data: utente
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog chiuso');
    });
  }

  // creazione utente
  apriCreaUtente(): void {
    // apertura componente crea nuovo utente nel dialog
    const dialogRef = this.dialog.open(CreaNuovoUtenteComponent, {
      width: '60%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog chiuso');
    });
  }

  // paginazione
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // ad ogni paginazione carica lista utenti
    this.caricaListaUtenti();
    console.log(`pageEvent:`, e);
  }

// elimina utente specifico
  eliminaUtente(id: number): void {
    if (confirm("Sei sicuro di voler eliminare questo utente?")) {
      this.goRest.eliminaUtente(id).subscribe((data: any) => {
        console.log(`utente eliminato:`, data);
        // aggiorna lista utenti
        this.utenti = this.utenti.filter(utente => utente.id !== id);
        this.filtroUtenti(); // Applica il filtro dopo l'eliminazione
      });
    }
  }
}
