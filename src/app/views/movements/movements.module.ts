import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MovementComponent } from './components/movement.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MovementsComponent,
    MovementComponent
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    SharedModule
  ]
})
export class MovementsModule { }
