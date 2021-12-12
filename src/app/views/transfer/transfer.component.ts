import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { ContactsComponent } from './components/contacts.component';
import { ConfirmDialog } from '../../shared/components/confirm-dialog.component';
import { Contact } from 'src/app/models/contact';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CardsService } from 'src/app/api/cards.service';
import { TransferService } from 'src/app/api/transfer.service';
import { CardIdValidator } from 'src/app/shared/validators/card-id.validator';
import { TransferValidator } from 'src/app/shared/validators/transfer.validator';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'er-transfer',
  template: `
  <div class="content">
    <button mat-raised-button color="secondary" class="full-width mb-15" type="button" (click)="showContactsList()" >Lista contatti</button>
    <form class="card-form" (ngSubmit)="transfer()">
      <ng-container [formGroup]="transferForm">
        <mat-form-field class="half-width mb-15" appearance="fill">
          <mat-label>Nome</mat-label>
          <input matInput name="name" formControlName="name">
        </mat-form-field>
        <mat-form-field class="half-width mb-15" appearance="fill">
          <mat-label>Cognome</mat-label>
          <input matInput name="surname" formControlName="surname" >
        </mat-form-field>
        <mat-form-field class="full-width mb-15" appearance="fill">
          <mat-label>IBAN</mat-label>
          <input matInput name="iban" formControlName="iban" ibanValidator>
          <mat-error *ngIf="transferForm.get('iban')?.getError('ibanWrong')">
            Codice IBAN errato
          </mat-error>
        </mat-form-field>
        <div formGroupName="detail">
          <mat-form-field class="half-width mb-15" appearance="fill">
            <mat-label>Importo</mat-label>
            <input matInput id="amount" name="amount" formControlName="amount" amountValidator>
            <mat-error *ngIf="transferForm.get('detail')?.get('amount')?.getError('notNumber')">
              Si prega di inserire solo valori numerici
            </mat-error>
            <mat-error *ngIf="transferForm.get('detail')?.get('amount')?.getError('isNegative')">
              Si prega di inserire solo importi positivi
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill" class="half-width mb-15">
            <mat-label>Seleziona una carta</mat-label>
            <select matNativeControl name="cardId" formControlName="cardId">
              <option value=""></option>
              <option value="falsecardfortest">falsecardfortest</option>
              <option *ngFor="let card of cards$ | async" [value]="card._id">{{ card.number }}</option>
            </select>
            <mat-error *ngIf="transferForm.get('detail.cardId')?.getError('poorCredit') || transferForm.get('detail')?.get('amount')?.getError('poorCredit')">
              Credito non sufficiente
            </mat-error>
            <mat-error *ngIf="transferForm.get('detail.cardId')?.getError('cardNotFound')">
              Carta inesistente
            </mat-error>
          </mat-form-field>
        </div>
      </ng-container>
      <button mat-raised-button color="primary" class="full-width mb-15" [disabled]="transferForm.invalid" type="submit" >Trasferisci denaro</button>
    </form>
  </div>
  `,
  styles: [`
    .content {
      max-width: 900px;
      margin: auto;
      background: white;
      padding: 25px;
      border-radius: 3px;
    }
  `]
})
export class TransferComponent {
  cards$ = new BehaviorSubject<Card[]>([]); 

  transferForm = this._formBuilder.group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    iban: new FormControl('', [Validators.required]),
    detail:  this._formBuilder.group({ 
      amount: new FormControl(0, [Validators.required], [this._transferValidator.validate()]),
      cardId: new FormControl('', [Validators.required], [this._cardIdValidator.validate(), this._transferValidator.validate()]),
    } , { updateOn: 'change' })
  }, { updateOn: 'change' })

  constructor(public _dialog: MatDialog, private _snackBar: MatSnackBar, 
    private _serviceCard: CardsService, private _transferService: TransferService,
    private _formBuilder: FormBuilder, private _cardIdValidator: CardIdValidator,
    private _transferValidator: TransferValidator) { 
    
  }

  ngOnInit() {
    this._serviceCard.getCards().subscribe((res) => {
      this.cards$.next(res);
    })
  }

  showContactsList(): void {
    let dialogRef = this._dialog.open(ContactsComponent, {
      height: 'fit-content',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result: Contact) => {
      if(result)
      {
          this.transferForm.reset();
          this.transferForm.setValue({
            name: result.name, 
            surname: result.surname,
            iban: result.iban,
            detail: {
              amount: 0,
              cardId: ''
            }
          });
      }
    });
  }

  transfer(): void {
    const dialogRef = this._dialog.open(ConfirmDialog, {
      width: '450px',
      data: { title: 'Sei sicuro?', content: 'Vuoi procedere con il trasferimento?'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        const {name, surname, iban, detail: {amount}, detail: {cardId} }  = this.transferForm.value;
        this._transferService.postTransfer({name, surname, iban, amount, cardId }).subscribe(res => {
          // TODO: CHECK AMOUNT NUMBER
          this._snackBar.open('Trasferimento concluso', 'Chiudi');
          this.transferForm.reset();
        })
      }
    });
  }
}
