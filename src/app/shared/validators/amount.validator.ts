import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";
import { Utils } from "../utils";

export function amountValidator(control: AbstractControl): ValidationErrors | null {
    if(!control.value)
        return null;
    else if(!Utils.isNumeric(control.value))
        return { 'notNumber' : true };
    else if(control.value < 0)
        return { 'isNegative' : true };
    return null;
}

@Directive({
    selector: '[amountValidator]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: AmountValidator,
      multi: true
    }]
  })
export class AmountValidator implements Validators {
    validate(control: AbstractControl): ValidationErrors | null {
       return amountValidator(control);
    }
}