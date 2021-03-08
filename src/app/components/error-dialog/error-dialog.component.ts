import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData} from './dialog-int';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  message;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.message = this.data.errMsg;
  }

  ngOnInit(): void {
  }

}
