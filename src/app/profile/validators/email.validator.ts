import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      if (control.value !== null) { 

        const errorToAddToControl = { invalidEmail: { value: control.value } };

        return !control.value.includes('@')
          ? errorToAddToControl
          : null;

      } else {

        return null

      }
      
    };
}


