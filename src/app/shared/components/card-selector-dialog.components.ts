import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { ConfirmDialog } from './confirm-dialog.component';

@Component({
  selector: 'er-card-selector-dialog',
  template: `
        <h1 mat-dialog-title>Seleziona una carta:</h1>
        <div mat-dialog-content>
          <mat-select placeholder="Seleziona una carta" [(value)]="selectedCard">
            <mat-option value=""></mat-option>
            <mat-option *ngFor="let card of cards$ | async" [value]="card._id">
              {{ card.number }}
            </mat-option>
          </mat-select>
        </div>
        <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">No</button>
        <button mat-button color="primary" (click)="selectCard()" [disabled]="this.selectedCard === null">Vai</button>
        </div>
    `
})
export class CardSelectorDialog {
  cards$ = new BehaviorSubject<Card[]>([]);
  selectedCard: string | null = null;

  constructor(private _service: CardsService, public dialogRef: MatDialogRef<ConfirmDialog>) {

  }

  ngOnInit() {
    this._service.getCards().subscribe((res) =>  {
      this.cards$.next(res);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectCard(): void {
    this.dialogRef.close(this.selectedCard);
  }
}
