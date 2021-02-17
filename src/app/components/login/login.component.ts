import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fireAuth: FireAuthService,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private http: HttpClient) { }

  email: string;
  password: string;
  userErr = false;
  errMsg: string;
  passErr = false;
  showError: boolean;
  location$;

  ngOnInit(): void {
    if (navigator.onLine){
        this.showError = false;
    }else{
        this.showError = true;
    }
    navigator.geolocation.getCurrentPosition(data => {
      this.http.get(`https://api.opencagedata.com/geocode/v1/json?q=${data.coords.latitude}+${data.coords.longitude}&key=ba50e0f71ab94d94bb126d35f4a54da3`).subscribe(data=>{
        this.location$  = data;
        console.log(this.location$.results[0].formatted);
      });
      console.log('lat:: ' + data.coords.latitude + ' log:: ' + data.coords.longitude);
    }, error => {
      console.error(error.message);
    })
  }

  signIn(){
    this.fireAuth.login(this.email, this.password).then(data => {
      if (data){
        if (data === 'auth/user-not-found') {
          this.userErr = true;
          this.errMsg = 'user not found';
        } else if (data === 'auth/wrong-password') {
          this.passErr = true;
          this.errMsg = 'wrong password';
        }
      }
    });
  }

  clear(){
    this.userErr = false;
    this.passErr = false;
  }

}
