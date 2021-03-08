import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../list/list.component';
import { ExpenseService } from 'src/app/services/expense.service';
import {IncomeService} from '../../services/income.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private exSer: ExpenseService, private inSer: IncomeService) {
  }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteExpense(){
    if (this.data.type === 'Income') {
      this.inSer.delIncome(this.data.lId);
    }else if (this.data.type === 'Expense') {
      this.exSer.delExpense(this.data.lId);
    }
    this.dialogRef.close();
  }
}
