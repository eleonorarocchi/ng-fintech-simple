import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { CardForm } from 'src/app/models/card-form';
import { CardFormComponent } from './components/card-form.component';

@Component({
  selector: 'er-cards',
  template: `
   <mat-drawer-container class="drawer-container" autosize>
    <div class="drawer-sidenav-content">
      <er-card-list (addCard)="drawer.opened ? null : drawer.toggle()" (removeCard)="removeFromList($event)" (seeTransactions)="seeTransactions($event)" [cards]="cards$ | async" ></er-card-list>
    </div>
    <mat-drawer #drawer class="drawer-sidenav" mode="side" position="end">
      <er-card-form #cardform (close)="closeRegForm()" (addCard)="addCard($event)"></er-card-form>
    </mat-drawer>
  </mat-drawer-container>
  `,
  styles: [`
    .drawer-container {
      position: absolute;
      right: 0px;
      left: 0px;
      bottom: 0px;
      top: 64px;
    }
    
    .drawer-sidenav-content {
      width: 100%;
      height: 100%;
    }
    
    .drawer-sidenav {
      padding: 20px;
      width: 50%;
      height: 100%;
    }
  `]
})
export class CardsComponent implements OnInit {
  cards$ = new BehaviorSubject<Card[]>([]); 
  @ViewChild('cardform', {read: CardFormComponent}) public cardForm!: CardFormComponent;
  @ViewChild('drawer') public drawer!: MatDrawer;
  
  constructor(private _snackBar: MatSnackBar, private _service: CardsService, private _router: Router) { }

  ngOnInit(): void {
    this._service.getCards().subscribe(res => {
        this.cards$.next(res);
      }
    )
  }

  addCard(obj: CardForm) {
    this._service.postCards(obj).subscribe(res =>
      this.cards$.next(this.cards$.value.concat(res))
    )

    this._snackBar.open('La nuova carta è stata aggiunta.', 'Chiudi');
  }

  removeFromList(id: string) {
    this._service.deleteCard(id).subscribe(res =>
      this.cards$.next( this.cards$.value.filter(card => card._id !== id) )
    )
    
    this._snackBar.open('La carta è stata rimossa', 'Chiudi');
  }

  seeTransactions(id: string) {
    this._router.navigate(['/dashboard/movements/', id])
  }

  closeRegForm() {
    this.cardForm.cleanup();
    this.drawer.toggle();
  }

}
