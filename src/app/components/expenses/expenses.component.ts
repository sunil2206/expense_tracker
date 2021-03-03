import { Component, OnInit } from '@angular/core';
import { expense } from 'src/app/models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expensesCat = ['Grocery', 'Home', 'Entertainment', 'Car', 'Health', 'Gift', 'Eating Out', 'Bills', 'Transport'];
  selected: string;
  todayVal;
  category;
  newExpense = new expense();

  expense: expense;
  expenses$;

  iconVar;
  icon(cateogry: string){
    if (cateogry === 'Grocery') {
      return this.iconVar = 'fas fa-shopping-basket';
    }
    else if (cateogry === 'Home') {
      return this.iconVar = 'fas fa-home';
    }
    else if (cateogry === 'Entertainment') {
      return this.iconVar = 'fas fa-cocktail';
    }
    else if (cateogry === 'Car') {
      return this.iconVar = 'fas fa-taxi';
    }
    else if (cateogry === 'Health') {
      return this.iconVar = 'fas fa-heartbeat';
    }
    else if (cateogry === 'Gift') {
      return this.iconVar = 'fas fa-gift';
    }
    else if (cateogry === 'Eating Out') {
      return this.iconVar = 'fas fa-utensils';
    }
    else if (cateogry === 'Bills') {
      return this.iconVar = 'fas fa-file-invoice-dollar';
    }
    else if (cateogry === 'Transport') {
      return this.iconVar = 'fas fa-subway';
    }

  }

  constructor(private expenseSer: ExpenseService, private matModal: MatDialog, public exService: ExpenseService) {
    this.todayVal = new Date();
    let vUid = sessionStorage.getItem('uid');
    this.exService.viewExpense(vUid).subscribe(data => { this.expenses$ = data; });
   }


  ngOnInit(): void {
  }
  add(note: HTMLInputElement, amount: HTMLInputElement){
    this.newExpense.amount = +amount.value;
    this.newExpense.date = this.todayVal.getDate() + '-' + (this.todayVal.getMonth() + 1) + '-' + this.todayVal.getFullYear();
    this.newExpense.category = this.category;
    this.newExpense.note = note.value;
    this.newExpense.key = sessionStorage.getItem('uid');
    // console.log(this.newExpense);
    this.expenseSer.addExpense(this.newExpense).then( resolve => {
      amount.value = '0';
      note.value = '';
      const dialRef = this.matModal.open(SuccessDialogComponent, {
        width: '95%'
      });
      dialRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
          dialRef.close();
        }, 500);
      });
    });
  }
  openDialog(varExpense): void {
    const dialogRef = this.matModal.open(DeleteDialogComponent, {
      width: '250px',
      data: {lId: varExpense.key}
    });
  }
}
