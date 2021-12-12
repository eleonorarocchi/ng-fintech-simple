import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormsModule, Validators } from '@angular/forms';
import { LightCurrencyPipe } from './light-currency.pipe';
import { TruncatePipe } from './truncate.pipe';
import { FilterPipe } from './filter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ValidatorsModule } from './validators/validators.module';


@NgModule({
    declarations: [
        LightCurrencyPipe,
        TruncatePipe,
        FilterPipe,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        FormsModule,
        ValidatorsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        FormsModule,
        LightCurrencyPipe,
        TruncatePipe,
        FilterPipe,
        ValidatorsModule
    ]
})
export class SharedModule { }
