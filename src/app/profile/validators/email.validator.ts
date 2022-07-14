import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      return !control.value.includes('@') ? { invalidEmail: { value: control.value } } : null;
      
    };
}


