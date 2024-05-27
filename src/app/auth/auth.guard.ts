import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor( private router: Router, private authService: AuthService) { }

  // authGuard per proteggere le rotte (attivo solo se l'utente è loggato)
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(this.authService.isLoggedIn){
      return true
    }else{
      return this.router.navigate(["/login"])
    }
  }



}
