import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FireAuthService } from './fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor( private afAuth: FireAuthService, private router: Router) { }
  canActivate(){
   if ( this.afAuth.isLoggedIn()){
     return true;
   }else{
     this.router.navigate(['login']);
     return false;
   }
  }
}
