import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactsService } from 'src/app/api/contacts.service';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'er-contacts',
  template: `
    <ng-container *ngIf="( state$ | async)?.type === 'list'">
      <er-contact-list [contacts]="contacts$ | async" (select)="select($event)" (edit)="edit($event)" (remove)="remove($event)"></er-contact-list>
      <button mat-raised-button color="primary" class="full-width mt-15" type="button" (click)="state$.next({type:'new'})" >Nuovo contatto</button>
    </ng-container>
    <ng-container *ngIf="( state$ | async)?.type !== 'list'">
      <button mat-raised-button color="secondary" class="full-width mb-15" type="button" (click)="state$.next({type:'list'})"  >Indietro</button>
      <er-contact-form (addContact)="addContact($event)" [contact]="selectedContact$ | async"></er-contact-form>
    </ng-container>
  `
})
export class ContactsComponent {
  contacts$ = new BehaviorSubject<Contact[]>([]);
  state$ = new BehaviorSubject<{type: 'list' | 'edit' | 'new' , id?:number}>({type:'list'});

  selectedContact$ = combineLatest([this.contacts$, this.state$]).pipe(
    map((result) => {
      const selected = result[0].find(item => item._id == result[1].id)
      return (selected) ? selected : null; 
    })
  )
  
  constructor(public _dialog: MatDialogRef<ContactsComponent>, private _service: ContactsService ) { }

  ngOnInit() {
    this._service.getContacts().subscribe((res) => {
      this.contacts$.next(res);
    })
  }

  select(contact: Contact) : void {
    this._dialog.close(contact);
  }

  edit(contactId: number) : void {
    this.state$.next({type: 'edit', id: contactId});
  }
  
  remove(contactId: number) : void {
    this._service.deleteContact(contactId).subscribe((res) => {
      this.contacts$.next(this.contacts$.value.filter((c) => c._id !== contactId));
    });
  }

  addContact(contact: Contact) : void {
    const currentId = this.state$.value.id || null;
    if(!currentId)
    {
      // Creo nuovo contatto
      this._service.postContact(contact).subscribe((res:Contact) => {
        this.contacts$.next(this.contacts$.value.concat(res));
        this.state$.next({type:'list'})
      });
    } else {
      // Aggiorno contatto
      this._service.putContact(currentId, contact).subscribe((res: Contact) => {
        var index = this.contacts$.value.findIndex((i)=> i._id === currentId);
        this.contacts$.value[index] = res;
        this.contacts$.next(this.contacts$.getValue());
        this.state$.next({type:'list'})
      });
    }
  }
}