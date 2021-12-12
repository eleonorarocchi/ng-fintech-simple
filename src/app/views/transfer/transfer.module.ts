import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { ContactsComponent } from './components/contacts.component';
import { ContactListComponent } from './components/contact-list.component';
import { ContactFormComponent } from './components/contact-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransferComponent,
    ContactsComponent,
    ContactListComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransferRoutingModule,
    ReactiveFormsModule
  ]
})
export class TransferModule { }
