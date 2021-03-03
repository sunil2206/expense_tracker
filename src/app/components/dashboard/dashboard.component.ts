import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAuthService } from 'src/app/services/fire-auth.service';

import { NotificationService } from '../../services/notification.service';
import { UserService } from '../../services/user.service';
import { ExpenseService } from '../../services/expense.service';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userObj;
  constructor(
    private fireSer: FireAuthService,
    private notificationSer: NotificationService,
    private matSnackBar: MatSnackBar,
    private db: AngularFireDatabase
    ) {
    let vUid = sessionStorage.getItem('uid');
    this.db.list('/users', ref => ref.orderByChild('key').equalTo(vUid)).valueChanges()
      .subscribe( data => this.getName(data) );
  }

  isOpened: boolean;
  message;
  username;
  ngOnInit(): void {
    if (navigator.onLine){
      this.openSnackBar('Connected!!');
    }else{
      this.openSnackBar('No internet connection!!');
    }

    console.log(navigator.onLine);
    // this.notificationSer.requestPermission();
    // this.notificationSer.receiveMessage();
    // this.message = this.notificationSer.currentMessage;
  }
  getName(data): void{
      this.username = data[0].name;
  }
  openSnackBar(message){
    this.matSnackBar.open(message, 'ok', {
      duration: 2000
    });
  }
  signOut(){
    this.fireSer.logOut();
  }

  sideToggle(){
    this.isOpened === true ? this.isOpened = false : this.isOpened = true ;
  }
}
