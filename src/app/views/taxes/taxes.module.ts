import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxpayerComponent } from './components/taxpayer.component';
import { TreasuriesComponent } from './components/treasuries.component';
import { InpsComponent } from './components/inps.component';


@NgModule({
  declarations: [
    TaxesComponent,
    TaxpayerComponent,
    TreasuriesComponent,
    InpsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TaxesRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaxesModule { }
