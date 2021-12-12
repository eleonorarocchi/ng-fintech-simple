import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'er-contact-list',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Cerca</mat-label>
      <input matInput #search >
      <button *ngIf="this.search.value" matSuffix mat-icon-button aria-label="Clear" (click)="this.search.value=''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
    <mat-list role="list">
      <div mat-subheader>Contatti</div>
      <mat-list-item *ngFor="let contact of contacts | filter:{name: this.search.value } " role="listitem">
        <div class="container">
          <div class="row">
            <div class="col-1">
              <mat-icon>account_circle</mat-icon>
            </div>
            <div class="col">
              {{contact.name}} {{contact.surname}}<br/>
              {{contact.iban}} 
            </div>
            <div class="col buttons">
              <button mat-icon-button matTooltip="Seleziona" (click)="this.select.emit(contact)">
                <mat-icon>done</mat-icon>
              </button>
              <button mat-icon-button matTooltip="Modifica" (click)="this.edit.emit(contact._id)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button matTooltip="Rimuovi" (click)="this.remove.emit(contact._id)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [ `
    .col, .col-1 {
      align-items: center;
      display: flex;
    }
    .buttons {
      justify-content: right;
    }
  `]
})
export class ContactListComponent {
  @Input() contacts: Contact[] | null = null;
  @Output() select: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('search', { static: true }) search!: MatInput;

  constructor() { }
}
