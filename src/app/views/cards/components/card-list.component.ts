import { Component, Output, EventEmitter, Input} from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'er-card-list',
  template: `
  <div class="container">
    <div>
    <mat-selection-list [multiple]="false">
        <div mat-subheader>Carte</div>
        <mat-list-option *ngFor="let card of cards">
          <div class="row">
            <div class="col-1 middle">
              <span class="material-icons">credit_card</span>
            </div>
            <div class="col">
              {{removeSpaces(card.number)}}<br/>
              <div class="detail">{{card.amount | lightcurrency}} - <span>{{card.type}}</span></div>
            </div>
            <div class="col-2 right middle">
              <span class="material-icons" matTooltip="Vedi movimenti" (click)="seeTransactions.emit(card._id)">receipt_long</span>
              <span class="material-icons" matTooltip="Rimuovi" (click)="removeCard.emit(card._id)">delete</span>
            </div>
          </div>
        </mat-list-option>
      </mat-selection-list>
      <button mat-raised-button color="primary" class="full-width mt-15" (click)="addCard.emit()">Aggiungi</button>
    </div>
  </div>
      `,
  styles: [`
    .right {
      justify-content: right;
    }
    .middle {
      display: flex;
      align-items: center;
    }
    .right .material-icons {
      cursor: pointer;
    }
    .container {
      padding: 50px;
    }
    .container > div {
      background: white;
      margin-left: auto;
      margin-right: auto;
      border: 1px solid #cacaca;
      border-radius: 3px;
    }
    .detail{
      color: grey;
      font-size: small;
    }
    .detail span {
      text-transform: capitalize;
    }
  `
  ]
})
export class CardListComponent {
  @Output() seeTransactions = new EventEmitter<string>();
  @Output() removeCard = new EventEmitter<string>();
  @Output() addCard = new EventEmitter();
  @Input() cards: Card[] | null = null;

  removeSpaces(obj:string) : string
  {
    return obj.replace(/\s/g, "");
  }
}
