import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncomeService } from '../../services/income.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { income } from 'src/app/models/income.model';

@Component({
  selector: 'app-in-list',
  templateUrl: './in-list.component.html',
  styleUrls: ['./in-list.component.css']
})
export class InListComponent implements OnInit {

  varIncome: income;
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

  constructor(public dialog: MatDialog, public exService: IncomeService) {
    let vUid = sessionStorage.getItem('uid');
    this.exService.viewIncome(vUid).subscribe(data => { this.incomes$ = data; });
  }
  ngOnInit(): void {

  }
  openDialog(varIncome): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { lId: varIncome.key, type: 'Income' }
    });
  }

}
