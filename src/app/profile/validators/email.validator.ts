import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    
      const mustInclude:Boolean = control.value.includes('@');

      console.log(mustInclude)

      return !mustInclude ? { validEmail: { value: control.value } } : null;
      
    };
}

