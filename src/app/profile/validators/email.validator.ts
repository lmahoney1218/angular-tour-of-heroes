import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (control.value !== null) { 

        return !control.value.includes('@') ? { invalidEmail: { value: control.value } } : null;

      } else {

        return null

      }
      
    };
}


