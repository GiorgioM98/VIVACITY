import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoRestService } from '../../servizi/go-rest.service';

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
    private goRest: GoRestService
  ) { }

  ngOnInit(): void {
    // controllo form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
      const password = this.loginForm.value.password;
      const auth_token = this.loginForm.value.auth_token;

      // chiamata della funzione login
      this.authService.login(email, password, auth_token)?.subscribe(
        (data: any) => {
          // verifica expirationDate
          const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
          // creazione user dopo login
          this.authService.createUser(data.localId, data.idToken, expirationDate);
          // set local storage
          localStorage.setItem('user', JSON.stringify(this.authService.user));
          this.isLoggedIn = true;
          // reset the login form
          this.loginForm.reset({
            email: '',
            password: '',
            auth_token: '',
          });
        },
        (error: { status: number }) => {
          if (error.status === 400) {
            alert('Email o password non valide!');
          } else {
            alert('Si è verificato un errore durante il login');
          }
        }
      );
    }
  }



}
