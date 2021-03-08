import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ExpenseService } from 'src/app/services/expense.service';
import { expense } from 'src/app/models/expense.model';
import { Observable } from 'rxjs';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export interface DialogData {
  lId: string;
  type: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  expense: expense;
  expenses$;

  iconVar;
  icon(category: string){
    if (category === 'Grocery') {
      return this.iconVar = 'fas fa-shopping-basket';
    }
    else if (category === 'House') {
      return this.iconVar = 'fas fa-home';
    }
    else if (category === 'Entertainment') {
      return this.iconVar = 'fas fa-cocktail';
    }
    else if (category === 'Car') {
      return this.iconVar = 'fas fa-taxi';
    }
    else if (category === 'Health') {
      return this.iconVar = 'fas fa-heartbeat';
    }
    else if (category === 'Gift') {
      return this.iconVar = 'fas fa-gift';
    }
    else if (category === 'Eating Out') {
      return this.iconVar = 'fas fa-utensils';
    }
    else if (category === 'Bills') {
      return this.iconVar = 'fas fa-file-invoice-dollar';
    }
    else if (category === 'Transport') {
      return this.iconVar = 'fas fa-subway';
    }

  }

  constructor(public dialog: MatDialog, public exService: ExpenseService) {
    let vUid = sessionStorage.getItem('uid');
    this.exService.viewExpense(vUid).subscribe(data => { this.expenses$ = data; });
  }
  ngOnInit(): void {

  }
  openDialog(varExpense): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { lId: varExpense.key, type: 'Expense'}
    });
  }
}
