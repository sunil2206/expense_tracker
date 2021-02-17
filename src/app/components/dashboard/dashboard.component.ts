import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FireAuthService } from 'src/app/services/fire-auth.service';

import { NotificationService } from '../../services/notification.service';
import { SocketService } from '../../services/socket.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private fireSer: FireAuthService,
    private socketSer: SocketService,
    private notificationSer: NotificationService,
    private matSnackBar: MatSnackBar
    ) {}

  isOpened: boolean;
  message;


  ngOnInit(): void {
    if(navigator.onLine){
      this.openSnackBar('Connected!!');
    }else{
      this.openSnackBar('No internet connection!!');
    }
    console.log(navigator.onLine);
    // this.notificationSer.requestPermission();
    // this.notificationSer.receiveMessage();
    // this.message = this.notificationSer.currentMessage;
  }

  openSnackBar(message){
    this.matSnackBar.open(message,'ok',{
      duration:2000
    });
  }
  signOut(){
    this.fireSer.logOut();
  }

  sideToggle(){
    this.isOpened === true ? this.isOpened = false : this.isOpened = true ;
  }
}
