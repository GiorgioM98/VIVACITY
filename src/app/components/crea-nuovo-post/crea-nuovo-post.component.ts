import { Component, Inject, OnInit } from '@angular/core';
import { GoRestService } from '../../servizi/go-rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { User } from '../../modelli/user.model';
import { UserRegistrazione } from '../../modelli/userRegistrazione.model';

@Component({
  selector: 'app-crea-nuovo-post',
  templateUrl: './crea-nuovo-post.component.html',
  styleUrl: './crea-nuovo-post.component.css',
})
export class CreaNuovoPostComponent implements OnInit {
  user!: User;
  userRegistrazione!: UserRegistrazione;

  creaNuovoPostForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreaNuovoPostComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private goRest: GoRestService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // controllo form
    this.creaNuovoPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // dati presi dall'input
    const title = this.creaNuovoPostForm.value.title;
    const body = this.creaNuovoPostForm.value.body;
    console.log(this.creaNuovoPostForm.value);

    // prendiamo user id dal local storage
    const userRegistrazione = localStorage.getItem('userRegistrazione');
    if (userRegistrazione) {
      this.userRegistrazione = JSON.parse(userRegistrazione);
      const utenteId = this.userRegistrazione.id;

      // costruzione url
      const url = `https://gorest.co.in/public/v2/users/${utenteId}/posts`;

      // richiamo la funzione per creare un nuovo post
      this.goRest.creaNuovoPost(url, { title: title, body: body }).subscribe(
        (data: any) => {
          console.log("Nuovo post creato", data);
        }
      );

      // chiusura della finestra
      this.dialogRef.close();
      // ricaricare la pagina
      window.location.reload();
    } else {
      console.error("Impossibile trovare l'utente nel local storage.");
    }
  }

  // bottone chiusura della finestra
  chiudi(): void {
    this.dialogRef.close();
  }
}
