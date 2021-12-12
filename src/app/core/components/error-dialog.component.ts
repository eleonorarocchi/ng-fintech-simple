import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `<div>
  <div>
    <h1 mat-dialog-title>Attenzione!</h1>
    <div mat-dialog-content>
        {{data}}
    </div>
    <div mat-dialog-actions>
        <button mat-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>Ho capito</button>
    </div>
  </div>
</div>`,
styles: [`
  div {
    text-align: center;
  }

  .mat-dialog-actions {
    float: right;
  }
`]
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}