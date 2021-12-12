import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsComponent } from './cards.component';
import { CardFormComponent } from './components/card-form.component';
import { CardListComponent } from './components/card-list.component';
import { CardsRoutingModule } from './cards-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CardsComponent,
    CardFormComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardsRoutingModule
  ]
})
export class CardsModule { }
