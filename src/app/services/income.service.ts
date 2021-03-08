import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private db: AngularFireDatabase) { }

  viewIncome(uId){
    return this.db.list('/incomes', ref => ref.orderByChild('key').equalTo(uId)).snapshotChanges();
  }
  addIncome(argIncome: income){
    return this.db.list('/incomes').push(argIncome).then(result => {
      return result;
    }, error => {
      return error;
    });
  }

  getIncome(uId){
    return this.db.list('/incomes', ref => ref.orderByKey().equalTo(uId)).snapshotChanges();
  }

  delIncome(eId: string){
    this.db.object('/incomes/' + eId).remove();
  }
}
