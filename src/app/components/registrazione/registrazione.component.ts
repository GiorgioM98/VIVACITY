import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { GoRestService } from '../../servizi/go-rest.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit {

  registrazioneForm!: FormGroup;
  idUser!: number;

  constructor(public router: Router, private formBuilder: FormBuilder, private authService: AuthService, private goRest: GoRestService) { }

  ngOnInit(): void {
    this.registrazioneForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['', [Validators.required]],
      password: ['', [Validators.required]],
      auth_token: ['', [Validators.required]]
    });
  }

  onNavigate() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    const { name, gender, email, status, password, auth_token } = this.registrazioneForm.value;
    console.log(name, gender, email, status, password, auth_token);

    this.authService.registrazione(email, password).subscribe(
      (data: any) => {
        console.log('Registrazione effettuata al servizio firebase', data);

        if(typeof localStorage !== 'undefined') {
          // Memorizza l'auth_token nel local storage
          this.authService.createUserRegistrazione(name, gender, email, status, auth_token, this.idUser);
          console.log('Creato user registrazione nel local storage', this.authService.userRegistrazione);
          localStorage.setItem('userRegistrazione', JSON.stringify(this.authService.userRegistrazione));
        } else {
          console.error('local storage non definito');
        }

        // Usa l'auth_token per creare un nuovo utente con GoRest
        this.goRest.creaNuovoUtente({ name, gender, email, status }).subscribe(
          (userData: any) => {
            console.log('Nuovo utente creato nel database GoRest', userData);

            // Ottieni l'ID dell'utente creato
            const idUser = userData.id;
            console.log('ID utente creato', idUser);

            // Aggiorna l'oggetto userRegistrazione con l'ID dell'utente creato
            this.authService.userRegistrazione!.id = idUser;
            console.log('Aggiornato l\'ID dell\'user registrazione', this.authService.userRegistrazione);

            // Aggiorna il local storage con l'utente registrato con ID
            localStorage.setItem('userRegistrazione', JSON.stringify(this.authService.userRegistrazione));

            // Dopo aver completato tutte le operazioni, reindirizza l'utente alla pagina di login
            this.router.navigate(['login']);
          },
          (error) => {
            console.error('Errore durante la creazione del nuovo utente!', error);
          }
        );
      },
      (error) => {
        console.error('Errore durante la registrazione!', error);
      }
    );
  }
}
