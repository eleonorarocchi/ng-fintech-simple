import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidator } from './equal-fields.validator';
import { AmountValidator } from './amount.validator';
import { IbanValidator } from './iban.validator';
import { TransferValidatorDirective } from './transfer.validator';
import { FiscalCodeValidator } from './fiscal-code.validator';



@NgModule({
  declarations: [
    EqualFieldsValidator, 
    AmountValidator,
    IbanValidator,
    FiscalCodeValidator,
    TransferValidatorDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    EqualFieldsValidator,
    AmountValidator,
    IbanValidator,
    FiscalCodeValidator,
    TransferValidatorDirective
  ]
})
export class ValidatorsModule { }
