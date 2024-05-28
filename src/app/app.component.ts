import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Vivacity';

  loading: boolean = true;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    //prende i dati dal local storage con i dati dell'utente loggato
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user')!)
      this.authService.createUser(user.name, user.gender, user.email, user.status, user.auth_token, user.id)
    }
  }
}


