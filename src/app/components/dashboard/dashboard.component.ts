import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService) { }


  // logout
  onLogout() {
    if (confirm("Sei sicuro di voler uscire?")) {
      this.authService.logout();
    }
  }

}
