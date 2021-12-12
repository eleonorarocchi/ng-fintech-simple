import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function equalGenericFieldsValidator(firstField:string, secondField:string): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        return checkMatch(control, firstField, secondField);
    }
}

export function equalFieldsValidator(control: AbstractControl): ValidationErrors | null {
    return checkMatch(control, 'password', 'repeatPassword');
}

function checkMatch(control: AbstractControl, firstField:string, secondField:string) {
    return control.parent?.get(firstField)?.value == control.parent?.get(secondField)?.value ? null : { 'noMatch' : true };
}

@Directive({
    selector: '[equalFieldsValidator]',
    providers: [{
      provide: NG_VALIDATORS,
      useExisting: EqualFieldsValidator,
      multi: true
    }]
  })
export class EqualFieldsValidator implements Validators {
    @Input() public firstField: string = 'password';
    @Input() public secondField: string = 'repeatPassword';
    validate(control: AbstractControl): ValidationErrors | null {
       return checkMatch(control, this.firstField, this.secondField);
    }
}