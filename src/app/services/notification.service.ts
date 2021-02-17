import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  currentMessage = new BehaviorSubject(null);
  constructor( private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(message => {
      console.log(message);
    });
  }

  requestPermission(){
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
          console.log(token);
          // this.toastrSer.success('permission granted');
      },
      (err) => {
        console.error('Permission denied');
        // this.toastrSer.error('permission denied');
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }

}
