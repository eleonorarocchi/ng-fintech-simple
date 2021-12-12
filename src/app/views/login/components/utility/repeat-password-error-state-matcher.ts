import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class repeatPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.root.get('repeatPassword')?.hasError('noMatch');
    const userActions = control?.dirty || control?.touched || form?.submitted;
    return !!((invalidControl || invalidParent) && userActions);
  }
}