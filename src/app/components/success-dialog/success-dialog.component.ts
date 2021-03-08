import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../expenses/expenses.component';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {
  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.message = this.data.mType;
  }

  ngOnInit(): void {
  }

}
