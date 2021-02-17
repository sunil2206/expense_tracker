import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {SocketService} from '../../services/socket.service';
import {timeInterval} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  msgs = [];
  sessUid = sessionStorage.getItem('uid');
  typing = false;
  user;

  constructor(private socketSer: SocketService, private userSer: UserService) {
  }

  ngOnInit(): void {
    this.socketSer.receiveMessage(this.msgs);
    this.typing = this.socketSer.listenTypingEvent();
    this.userSer.getUser(this.sessUid).subscribe(data => {
      data.forEach(user => {
        this.user = user.payload.val();
      });
    });

  }

  sendMessage(message: HTMLInputElement){
    let now = moment();
    const newMsg = {
      uid: sessionStorage.getItem('uid'),
      name: this.user.name,
      message: message.value,
      time: now.format('hh:mm A')
    };
    this.socketSer.sendMessage(newMsg);
    message.value = '';
  }

  startTyping(){
    this.socketSer.startTypingEvent();
  }
  stopTyping(){
    this.socketSer.endTypingEvent();
  }
}
