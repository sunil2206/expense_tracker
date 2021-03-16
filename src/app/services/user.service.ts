import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { user } from '../models/user.model';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }
  userData;
  addUser( userObj: user){
    this.db.list('/users').push(userObj);
  }
  getUser(uId: string){
    return this.db.list('/users', ref => ref.orderByChild('key').equalTo(uId)).snapshotChanges();
  }
  async updateImg(uId: string, imgName: string){

    this.db.list('/users', ref => ref.orderByChild('key').equalTo(uId)).snapshotChanges()
      .subscribe( data => {
        this.db.list('/users', ref => ref.orderByChild('key').equalTo(uId)).update(data[0].key, { image: imgName} );
      });

  }
}
