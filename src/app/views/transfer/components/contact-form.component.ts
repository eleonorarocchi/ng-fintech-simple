import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'er-contact-form',
  template: `
    <form #f="ngForm" name="f" class="card-form" (ngSubmit)="saveContact(this.f)">
      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Nome</mat-label>
        <input matInput ngModel name="name" required #name="ngModel" [(ngModel)]="nameValue">
      </mat-form-field>
      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Cognome</mat-label>
        <input matInput ngModel name="surname" required #surname="ngModel" [(ngModel)]="surnameValue">
      </mat-form-field>
      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>IBAN</mat-label>
        <input matInput ngModel name="iban" required #iban="ngModel" [(ngModel)]="ibanValue" ibanValidator>
        <mat-error *ngIf="iban.hasError('ibanWrong')">
          Codice IBAN errato
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" class="full-width mb-15" [disabled]="f.invalid" type="submit" >Salva</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
  ]
})
export class ContactFormComponent {
  @Input() contact: Contact | null = null;
  @Output() addContact: EventEmitter<Contact> = new EventEmitter<Contact>();
  nameValue:string | null = null;
  surnameValue:string | null = null;
  ibanValue:string | null = null;

  constructor() { }

  ngAfterViewInit() {
    this.nameValue = this.contact?.name ? this.contact?.name : null;
    this.surnameValue = this.contact?.surname ? this.contact?.surname : null;
    this.ibanValue = this.contact?.iban ? this.contact?.iban : null;
  }

  saveContact(form: NgForm): void {
    if(form.valid)
      this.addContact.emit(form.value);
  }

}
