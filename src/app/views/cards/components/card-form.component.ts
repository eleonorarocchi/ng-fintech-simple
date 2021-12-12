import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardForm } from 'src/app/models/card-form';
import { CardType, CardTypes } from 'src/app/models/cart-type';

@Component({
  selector: 'er-card-form',
  template: `
    <h2>Aggiungi carta</h2>
    <form #f="ngForm" name="f" class="card-form" (ngSubmit)="f.valid ? add(f) : null">
      <div class="row">
        <div class="col">
          <mat-form-field appearance="fill" class="full-width mb-15">
            <mat-label>Tipo carta</mat-label>
            <mat-select ngModel name="type" #type="ngModel" required>
              <mat-option value="null"></mat-option>
              <mat-option *ngFor="let cardType of cardTypes" value="{{cardType}}">{{ cardType | titlecase}}</mat-option>
            </mat-select>
          </mat-form-field>  
        </div> 
      </div>
      <div class="row">
        <div class="col">
          <mat-form-field class="full-width mb-15" appearance="fill">
            <mat-label>Nome</mat-label>
            <input matInput ngModel name="name" required #name="ngModel">
          </mat-form-field>
        </div>
        <div class="col">
          <mat-form-field class="full-width mb-15" appearance="fill">
            <mat-label>Cognome</mat-label>
            <input matInput ngModel name="surname" required #surname="ngModel">
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <mat-form-field class="full-width mb-15" appearance="fill">
            <mat-label>N° Carta</mat-label>
            <input matInput ngModel name="number" required #number="ngModel" maxlength="16" minlength="16">
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <mat-form-field class="full-width mb-15" appearance="fill">
            <mat-label>Codice di sicurezza</mat-label>
            <input matInput ngModel name="csc" required #csc="ngModel" maxlength="3" minlength="3">
          </mat-form-field>
        </div>
      </div>

      <button mat-raised-button color="primary" class="full-width mb-15" [disabled]="f.invalid" type="submit" >Aggiungi carta</button>
      <button mat-raised-button class="full-width mb-15" (click)=" this.close.emit()" type="button">Annulla</button>
     
    </form>
  `,
  styles: [`
    .card-form {
      min-width: 150px;
      width: 100%;
      padding: 20px;
    }
  `]
})
export class CardFormComponent {
  @Output() addCard = new EventEmitter<CardForm>();
  @Output() close = new EventEmitter();
  @ViewChild('f') public form!: NgForm;

  cardTypes: CardType[] = [...CardTypes];

  add(f: NgForm) {
    if(f.valid) {
      this.addCard.emit(f.value as CardForm);
      this.close.emit();
    }
  }

  cleanup(){
    this.form.resetForm();
  }
}
