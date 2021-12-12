import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'er-confirm-dialog',
  template: `
        <h1 mat-dialog-title>{{data.title}}</h1>
        <div mat-dialog-content>
            <p>{{data.content}}</p>
        </div>
        <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">No</button>
        <button mat-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>Vai</button>
        </div>
    `
})
export class ConfirmDialog {

  constructor(public dialogRef: MatDialogRef<ConfirmDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
