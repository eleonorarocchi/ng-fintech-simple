import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap, startWith, pairwise } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { Movement } from 'src/app/models/movement';

@Component({
  selector: 'er-movements',
  template: `
  <div class="content">
    <mat-form-field>
      <mat-select placeholder="Seleziona una carta" (selectionChange)="cardChangeValue($event)" [value]="selectedCardId$ | async">
        <mat-option value=""></mat-option>
        <mat-option *ngFor="let card of cards$ | async" [value]="card._id">
          {{ card.number }}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <h2 *ngIf="(selectedCard$ | async)">Saldo: €{{(selectedCard$ | async)?.amount}}</h2>
    <ng-container *ngFor="let mov of movements$ | async">
      <er-movement [date]= "mov.timestamp | date: 'dd/MM/yyyy'" [amount]="mov.amount" [type]="mov.type" [title]="mov.title" [description]="mov.description" ></er-movement>
    </ng-container>
    <button *ngIf="shouldLoadMore$ | async" mat-raised-button color="primary" class="full-width mb-15" type="button" (click)="loadOther()">Carica altro</button>
  </div>
  `,
  styles: [`
    .content {
      max-width: 1200px;
      margin: auto;
      background: white;
      padding: 25px;
      border-radius: 3px;
    }
  `]
})
export class MovementsComponent implements OnInit {
  cards$ = new BehaviorSubject<Card[]>([]);
  movements$ = new BehaviorSubject<Movement[]>([]);
  selectedCardId$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  loadMore$ = new BehaviorSubject<boolean>(true);

  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cardList, cardId]) => {
      const selected = cardList.filter(item => item._id === cardId);
      return (selected.length === 1 ? selected[0] : null) 
    })
  );

  loadData$ = combineLatest([this.selectedCard$, this.loadMore$]).pipe(
    map((data) => { return data[0]; })
  )

  shouldLoadMore$ = this.loadData$.pipe(
    startWith(null),
    pairwise(),
    map(([prev, active]) => ({ prev: prev, active: active })),
    switchMap(data => {
      return (data.active != null) ? this._service.getMovements(data.active._id, 5, data.prev?._id !== data.active?._id ? 0 : this.movements$.getValue().length)
        .pipe(
          map(result => { 
            this.movements$.next(data.prev?._id !== data.active?._id ? result.data : this.movements$.value.concat(result.data));
            return result.total > this.movements$.getValue().length
          } )
        ) 
       : of(null).pipe(map(result => { this.movements$.next([]); return false; } ))
    })
  )

  constructor(private _service: CardsService, private _activatedRoute: ActivatedRoute){
   }

  ngOnInit(): void {
    // Leggo l'elenco delle carte disponibili da servizio
    this._service.getCards().subscribe((res) =>  {
      this.cards$.next(res);
    })

    this._activatedRoute.paramMap.pipe(
      map((params) => params.get)
    )

    const cardId = this._activatedRoute.snapshot.paramMap.get("cardId");
    if (cardId)
      this.selectedCardId$.next(cardId)
  }

  loadOther():void {
    this.loadMore$.next(true);
  }

  cardChangeValue($event: MatSelectChange) {
    this.selectedCardId$.next($event.value);
  }
}