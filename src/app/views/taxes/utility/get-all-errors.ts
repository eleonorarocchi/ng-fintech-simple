import { FormArray, FormGroup } from "@angular/forms";

export function getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      if (control) {
        const errors = (control instanceof FormGroup || control instanceof FormArray)
          ? getAllErrors(control)
          : control.errors;
        if (errors) {
          acc[key] = errors;
          hasError = true;
        }
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }