import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { expense } from '../models/expense.model';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private db: AngularFireDatabase) { }

  viewExpense(uId){
    return this.db.list('/expenses', ref => ref.orderByChild('key').equalTo(uId)).snapshotChanges();
  }
  addExpense(Expense: expense){
      return this.db.list('/expenses').push(Expense).then(result => {
        return result;
      }, error => {
        return error;
      });
  }

  getExpense(uId){
    return this.db.list('/expenses', ref => ref.orderByKey().equalTo(uId)).snapshotChanges();
  }

  delExpense(eId: string){
    this.db.object('/expenses/' + eId).remove();
  }
}
