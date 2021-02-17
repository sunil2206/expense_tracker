import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }
  sendMessage(messageObj){
    this.socket.emit('chatMessage', messageObj);
  }
  receiveMessage(msgArr: Array<any>){
    this.socket.on('message', (message) => {
      console.log(message);
    });

    this.socket.on('chatMsg', (message) => {
      msgArr.push(message);
      console.log(message);
    });
  }

  startTypingEvent(){
    this.socket.emit('typing', true);
  }

  endTypingEvent(){
    this.socket.emit('typing', false);
  }

  listenTypingEvent(): boolean{
    var isTyping = false;
    this.socket.on('typing', (msg) => {
      if (msg == true) { isTyping = true; }
      if (msg == false) { isTyping = false; }
      console.log('typing::' + msg);
    });
    return isTyping;
  }
}
