import { Component, OnInit } from '@angular/core';
import { FireAuthService } from 'src/app/services/fire-auth.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fireAuth: FireAuthService, private router: Router, private userSer: UserService) { }
  email: string;
  name: string;
  password: string;
  newUser = new user();
  emailErr = false;
  ngOnInit(): void {
  }
  signUp(){
    return this.fireAuth.register(this.email, this.password).then(data => {
      if (data === 'done'){
        this.newUser.name = this.name;
        this.newUser.email = this.email;
        this.newUser.key = sessionStorage.getItem('uid');
        this.userSer.addUser(this.newUser);

        this.router.navigate(['login']);
      }else{
        if (data.code === 'auth/email-already-in-use'){
          this.emailErr = true;
        }
      }
      console.log(data);
    });
  }
  clear(){
    this.emailErr = false;
  }
}
