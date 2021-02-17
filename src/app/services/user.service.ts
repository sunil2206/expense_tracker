import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { user } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  addUser( userObj: user){
    this.db.list('/users').push(userObj);
  }
  getUser(uId: string){
    return this.db.list('/users', ref => ref.orderByChild('key').equalTo(uId)).snapshotChanges();
  }
}
