import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { UserRegistrazione } from './modelli/userRegistrazione.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Vivacity';

  loading: boolean = true;

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    //imposta il local storage con i dati dell'utente registrato
    if(localStorage.getItem('userRegistrazione')){
      const userRegistrazione= JSON.parse(localStorage.getItem('userRegistrazione')!)
      this.authService.createUserRegistrazione(userRegistrazione.name, userRegistrazione.gender, userRegistrazione.email, userRegistrazione.status, userRegistrazione.auth_token, userRegistrazione.id)
  }
}
}


