import { Component, Inject, OnInit } from '@angular/core';
import { GoRestService } from '../../servizi/go-rest.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-crea-nuovo-utente',
  templateUrl: './crea-nuovo-utente.component.html',
  styleUrl: './crea-nuovo-utente.component.css',

})
export class CreaNuovoUtenteComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<CreaNuovoUtenteComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any, private goRest: GoRestService, private formBuilder: FormBuilder) { }


  creaNuovoUtenteForm!: FormGroup


    ngOnInit(): void {
      // controllo form
      this.creaNuovoUtenteForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        email: ['', [Validators.required]],
        status: ['', [Validators.required]],
      });
    }




    onSubmit() {
      if (this.creaNuovoUtenteForm.invalid) {
        return;
      }
      const name = this.creaNuovoUtenteForm.value.name;
      const gender = this.creaNuovoUtenteForm.value.gender;
      const email = this.creaNuovoUtenteForm.value.email;
      const status = this.creaNuovoUtenteForm.value.status;
      console.log(this.creaNuovoUtenteForm.value);


      // chiamiamo la funzione del servizio goRest per creare un nuovo utente
       this.goRest.creaNuovoUtente({name: name, gender: gender, email: email, status: status})?.subscribe(
         (data: any) => {
           console.log(data);
         }
        )
        this.dialogRef.close();
        setTimeout(() => this.reloadWindow(), 1000);
    }

    // ricarica pagina dopo 1 sec
    reloadWindow() {
      window.location.reload();
    }

    chiudi(): void {
      this.dialogRef.close();
    }
  }


