import { Component, OnInit } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { income } from 'src/app/models/income.model';
import {ErrorDialogComponent} from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {
  incomesCat = ['Salary', 'Profit', 'Gift', 'Extra Income'];
  selected: string;
  todayVal;
  category;
  newIncome = new income();

  income: income;
  incomes$;

  iconVar;
  icon(cateogry: string){
    if (cateogry === 'Salary') {
      return this.iconVar = 'fas fa-money-bill';
    }
    else if (cateogry === 'Savings') {
      return this.iconVar = 'fas fa-piggy-bank';
    }
    else if (cateogry === 'Gift') {
      return this.iconVar = 'fas fa-hand-holding-usd';
    }
    else if (cateogry === 'Extra Income') {
      return this.iconVar = 'fas fa-file-invoice-dollar';
    }
  }

  constructor(private incomeSer: IncomeService, private matModal: MatDialog, public inService: IncomeService) {
    this.todayVal = new Date();
    let vUid = sessionStorage.getItem('uid');
    this.inService.viewIncome(vUid).subscribe(data => { this.incomes$ = data; });
  }


  ngOnInit(): void {
  }

  add(note: HTMLInputElement, amount: HTMLInputElement){
    this.newIncome.amount = +amount.value;
    if (+amount.value < 0){
      const dialogRef = this.matModal.open(ErrorDialogComponent,{
        width: '95%',
        data: { errMsg: 'Invalid amount !!!'}
      });
      dialogRef.afterOpened().subscribe( _ => {
        setTimeout(() => {
          dialogRef.close();
        }, 2000);
      });

    }else {
      this.newIncome.date = this.todayVal.getDate() + '-' + (this.todayVal.getMonth() + 1) + '-' + this.todayVal.getFullYear();
      this.newIncome.category = this.category;
      this.newIncome.note = note.value;
      this.newIncome.key = sessionStorage.getItem('uid');
      // console.log(this.newIncome);
      this.incomeSer.addIncome(this.newIncome).then(resolve => {
        amount.value = '0';
        note.value = '';
        const dialRef = this.matModal.open(SuccessDialogComponent, {
          width: '95%',
          data: {mType: 'Income'}
        });
        dialRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
            dialRef.close();
          }, 500);
        });
      });
    }
  }

}
