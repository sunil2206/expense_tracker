import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { of } from 'rxjs';
import {expense} from '../../models/expense.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { resolve } from 'dns';
import { rejects } from 'assert';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  todayVal;
  amount = '0';
  preSymbol;

  category;
  newExpense = new expense();
  constructor(private router: ActivatedRoute,private expenseSer: ExpenseService) {
    this.todayVal = new Date();
  }
  total: number;

  ngOnInit(): void {
    this.router.paramMap
      .subscribe(params => {
        this.category = params.get('category');
      });
  }
  enter(digit: string){
    if (this.amount === '0'){
      this.amount = digit;
    }else{
      this.amount += digit;
    }
  }
  remove(){
    this.amount = this.amount.slice(0 , -1);
  }
  calc(symbol: string){
    switch (symbol){
        case '+':
                  this.preSymbol=symbol;
                  this.total = +this.amount;
                  this.amount = '0';
                  break;
        case '-':
                  this.preSymbol=symbol;
                  this.total = +this.amount;
                  this.amount = '0';
                  break;
        case '*':
                  this.preSymbol=symbol;
                  this.total = +this.amount;
                  this.amount = '0';
                  break;
        case '/':
                  this.preSymbol=symbol;
                  this.total = +this.amount;
                  this.amount = '0';
                  break;
        case '=':
                  if (this.preSymbol === '+'){
                    this.total = this.total + (+this.amount);
                  }else if (this.preSymbol === '-'){
                    this.total = this.total - (+this.amount);
                  }else if (this.preSymbol === '*'){
                    this.total = this.total * (+this.amount);
                  }else if (this.preSymbol === '/'){
                    this.total = this.total / (+this.amount);
                  }
                  this.amount = this.total.toString();
                  break;
    }
  }
  add(note: HTMLInputElement){
    this.newExpense.amount = +this.amount;
    this.newExpense.date = this.todayVal.getDate() + '-' + (this.todayVal.getMonth()+1) + '-' + this.todayVal.getFullYear();
    this.newExpense.category = this.category;
    this.newExpense.note = note.value;
    this.newExpense.key = sessionStorage.getItem('uid');
    this.expenseSer.addExpense(this.newExpense).then( resolve => {
      this.amount = '';
      note.value = '';
    });
  }
}