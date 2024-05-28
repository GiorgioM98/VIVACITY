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
  // idUser!: number;

  constructor(public router: Router, private formBuilder: FormBuilder, private authService: AuthService, private goRest: GoRestService) { }

  ngOnInit(): void {
    this.registrazioneForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      status: ['', [Validators.required]],
      auth_token: ['', [Validators.required]]
    });
  }

  onNavigate() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    // dati input
    const { name, gender, email, status, auth_token } = this.registrazioneForm.value;
    console.log(name, gender, email, status, auth_token);

    // chiamata al servizio
    this.authService.registrazione({ name, gender, email, status}, auth_token).subscribe(
      (data: any) => {
        console.log('Registrazione effettuata al servizio goRest', data);
      },
      (error) => {
        alert('Si è verificato un errore durante la registrazione!');
        console.error('Errore durante la registrazione!', error);
      }
    );
  }
}
