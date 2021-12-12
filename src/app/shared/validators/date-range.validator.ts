import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Utils } from '../utils';

export function dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        if(control.get('dateFrom')?.value === "" || control.get('dateTo')?.value === "")
            return null;
            
        return (Utils.compareDate(control.get('dateFrom')?.value, control.get('dateTo')?.value)
        >= 0 ? null : { 'errorDate' : true })
    }
}
