import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";

export function fiscalCodeValidator(control: AbstractControl): ValidationErrors | null {
    if(!control.value)
      return null;
    const re = /^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i;
    const value: string = control.value;
    return value.match(re) ? null : { ibanWrong: true};
}

@Directive({
    selector: '[fiscalCodeValidator]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: FiscalCodeValidator,
      multi: true
    }]
  })
export class FiscalCodeValidator implements Validators {
    validate(control: AbstractControl): ValidationErrors | null {
       return fiscalCodeValidator(control);
    }
}