import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function regexValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) {
      return null;
    }

    const isValid = regex.test(value);

    return isValid
      ? null
      : {
          regex: {
            value: control.value,
            message: 'Article image URL does not seem to be valid',
          },
        };
  };
}
