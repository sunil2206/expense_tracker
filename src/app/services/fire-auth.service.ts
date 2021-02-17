import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { promise } from 'protractor';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  login(email: string , password: string ){
    return this.afAuth.signInWithEmailAndPassword(email, password).then(result => {
      sessionStorage.setItem('uid', result.user.uid);
      this.afAuth.idToken.subscribe(data => {
        sessionStorage.setItem('token', data);
        this.router.navigate(['dashboard']);
      });
    }, error => {
      return error.code;
    });
  }

  register(email: string , password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(data => {
      sessionStorage.setItem('uid', data.user.uid);
      return 'done';
    }, error => {
      return error;
    });
  }

  getCurrentUser(){
    this.afAuth.user.subscribe(user => {
      console.log(user.displayName);
    });
  }

  logOut(){
          sessionStorage.removeItem('token');
          this.router.navigateByUrl('login');
  }

  isLoggedIn(){
    if (sessionStorage.getItem('token') === null){
      return false;
    }else if (sessionStorage.getItem('token')){
      return true;
    }
  }
}
