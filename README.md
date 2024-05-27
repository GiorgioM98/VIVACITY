## Panoramica

L'applicazione (in partnership con NTT DATA) si concentra sullo sviluppo urbano e si integra con la piattaforma GoRest per fornire funzionalità di gestione degli utenti, post e commenti.
E' possibile visionarla direttamente online al seguente link: ("https://infotorino-8f06a.firebaseapp.com/registrazione")

## Login e Registrazione

L'applicazione è accessibile tramite registrazione e in seguito autenticazione. La registrazione e l'autenticazione necessitano di un Token che deve essere ottenuto in seguito all'accesso sulla piattaforma GORest: ("https://gorest.co.in/consumer/login") tramite i seguenti metodi: Google, Github o Microsoft.


### Dashboard

Il design della piattaforma è stato ideato con uno stile minimalista e moderno, la dashboard presenta colori pensati apposta per il tipo di applicazione.
All'interno possiamo trovare un buon abbinamento di colori e una buona predisposizione delle varie funzionalità.
Nella parte in alto è presente il logo caratterizzato da un palazzo sfarzoso abbinato a vari effetti visivi.
La denominazione, VIVACITY, presenta anch'essa degli effetti al lancio dell'app.


### Ricerca Utenti

Per semplificare la ricerca degli utenti, la pagina fornisce un input di ricerca. Gli utenti possono utilizzare questo input per filtrare la lista in base ai seguenti criteri:

- **Email**
- **Nome**


## Home

La Home, minimalizzata con uno stile tutto moderno offre una visione completa di tutti gli utenti disponibili, consentendo agli utilizzatori di effettuare ricerche per filtrare la lista in base a diversi criteri come email e nome.


### Visualizzazione Utenti

La pagina mostra una lista dettagliata di tutti gli utenti registrati. Ogni utente nella lista presenta informazioni chiave come email, nome, status e genere.
Nella parte sinistra è presente un avatar che cambia colore in base allo status dell'utente, verde se online, rosso se offline.


  ### Dettagli utente

Tramite la lista utenti, a lato, si ha la possibilita' di visualizzare nel dettaglio la scheda di un singolo utente, oppure di eliminarlo definitivamente.
Nella scheda ''Dettagli Utente'' si possono vizualizzare le info dettagliate di ciascun utente, oltre al fatto di vedere i post pubblicati con i vari commenti e la possiblità di inviare un commento personale.
L'immagine placeholder cambia in base al genere dell'utente.

 ### Post

La sezione Post offre una visione completa di tutti i post disponibili, consentendo agli utilizzatori di effettuare ricerche per filtrare la lista in base a diversi criteri come titolo e testo.
Per ogni post e' possibile visualizzare i commenti e inviarne di nuovi.

 ### Profilo

Nella sezione Profilo si possono visualizzare le info personali nel dettaglio dell'utente loggato.
L'immagine placeholder cambia in base al genere dell'utente.
Oltre a questi dettagli è possibile visualizzare anche i post con i commenti che l'utente ha pubblicato sulla piattaforma .


### Footer

Il footer è caratterizzato dalle info dello sviluppatore con il link che rimanda al suo profilo LinkedIn.

## Guida di Installazione

Per inizializzare il progetto sul proprio device, seguire i seguenti passaggi:

1. Clonare il repository sul proprio sistema locale.
2. Eseguire `npm install` per installare le dipendenze.
3. Configurare l'ambiente locale, se necessario.
4. Eseguire `ng serve --open` per avviare l'applicazione in modalità sviluppo e attendere l'apertura automatica del browser.


## Struttura del Progetto

Il progetto è strutturato in modo seguente:

- `src/`: Contiene il codice sorgente dell'applicazione.
  - `app/`: Contiene i componenti, i servizi e i moduli dell'app.
  - `assets/`: Contiene risorse come immagini e file statici.
- `node_modules/`: Contiene le dipendenze del progetto.
- `angular.json`: File di configurazione per Angular CLI.
- `package.json`: File di configurazione per le dipendenze del progetto.


## Risoluzione dei Problemi Comuni

### Problema: L'applicazione non si avvia correttamente

- **Soluzione:** Assicurarsi di aver eseguito `npm install` per installare le dipendenze. Controllare la console per eventuali errori durante l'avvio.

## API Endpoints

L'applicazione si interfaccia con l'API di GoRest per fornire funzionalità di gestione degli utenti e dei post. Di seguito sono elencati gli endpoints principali forniti dalla classe `HttpService`:

### Autenticazione

- **Registra un nuovo utente:**
  - Metodo: `POST`
  - Endpoint: `/v2/users`
  - Descrizione: Registra un nuovo utente.

### Profilo Utente

- **Trova tutti gli utenti:**

  - Metodo: `GET`
  - Endpoint: `/v2/users`
  - Descrizione: Ottiene le informazioni di tutti gli utenti.

- **Elimina un utente:**

  - Metodo: `DELETE`
  - Endpoint: `/v2/users/:userId`
  - Descrizione: Cancella un utente dato il suo ID.

- **Modifica il profilo utente:**
  - Metodo: `PUT`
  - Endpoint: `/v2/users/:userId`
  - Descrizione: Modifica il profilo di un utente.

### Post

- **Trova tutti i post:**

  - Metodo: `GET`
  - Endpoint: `/v2/posts`
  - Descrizione: Ottiene le informazioni di tutti i post.

- **Trova i post di un utente:**

  - Metodo: `GET`
  - Endpoint: `/v2/users/:userId/posts`
  - Descrizione: Ottiene i post di un utente dato il suo ID.

- **Aggiungi un nuovo post:**

  - Metodo: `POST`
  - Endpoint: `/v2/users/:userId/posts`
  - Descrizione: Aggiunge un nuovo post per un utente specifico.

- **Commenta un post:**

  - Metodo: `POST`
  - Endpoint: `/v2/posts/:postId/comments`
  - Descrizione: Aggiunge un commento a un post.

- **Leggi i commenti di un post:**
  - Metodo: `GET`
  - Endpoint: `/v2/posts/:postId/comments`
  - Descrizione: Ottiene i commenti di un post dato il suo ID.

Questo progetto è stato generato con la versione 17.3.0. ('https://v17.angular.io/docs')
