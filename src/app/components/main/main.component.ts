import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  totalExpense;
  totalIncome;
  constructor(private router: Router, public exService: ExpenseService, private db: AngularFireDatabase) {

    let vUid = sessionStorage.getItem('uid');

    this.db.list('/expenses', ref => ref.orderByChild('key').equalTo(vUid)).valueChanges()
        .subscribe( data => {

          setTimeout(() => {
            if (!data){
              this.totalExpense = 0;
            }else{
              this.totalExpense = this.countTotal(data);
            }
            console.log('expense :: ', this.totalExpense);
          }, 8000);
        });
    this.db.list('/incomes', ref => ref.orderByChild('key').equalTo(vUid)).valueChanges()
      .subscribe( data => {
        setTimeout(() => {
          if (!data) {
            this.totalIncome = 0;
          }else{
            this.totalIncome = this.countTotal(data);
          }
        }, 8000);
      });
   }

  ngOnInit(): void {
  }

  countTotal(data): number{
    let totalAmount = 0;
    for (let datas of data ) {
      totalAmount += datas.amount;
    }
    return totalAmount;
  }


  redirect(vLink: string){
    this.router.navigate(['dashboard/' + vLink]);
  }

}
