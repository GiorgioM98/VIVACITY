import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggedIn = false;
  message!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // controllo form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      auth_token: ['', [Validators.required]],
    });
  }

  // navigazione verso la pagina di registrazione
  onNavigate() {
    this.router.navigate(['/registrazione']);
  }

  onSubmit() {
    // invio form solo se e' valido
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      // const password = this.loginForm.value.password;
      const auth_token = this.loginForm.value.auth_token;
      console.log(email, auth_token);

      // chiamata della funzione login
      this.authService.login(auth_token)?.subscribe(
        (data: any) => {
          console.log("Login effettuato", data);
          if (data && data[0] && data[0].name) {
            // Se la risposta contiene i dati dell'utente
            const user = data[0];
            const expirationDate = new Date(new Date().getTime() + user.expiresIn * 1000);
            this.authService.createUser(user.name, user.gender, user.email, user.status, auth_token, user.id);
            console.log(this.authService.user);
            localStorage.setItem('user', JSON.stringify(this.authService.user));
            this.router.navigate(['/home']);
            this.isLoggedIn = true;
            this.loginForm.reset({
              email: '',
              auth_token: '',
            });
          } else {
            // Gestisci il caso in cui i dati dell'utente non siano presenti nella risposta
            console.error('Dati utente non presenti nella risposta:', data);
          }
        },
        (error: { status: number }) => {
          if (error.status === 400) {
            alert('Email o token non validi!');
          } else {
            alert('Si è verificato un errore durante il login');
          }
        }
      );

    }
  }



}
