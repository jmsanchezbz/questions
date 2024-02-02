import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameArticleValidator(): ValidatorFn {
    
  return (control: AbstractControl): ValidationErrors | null => {
    
    const value = control.value as string;

    if (!value) {
      return null;
    }

    const invalidNames = ['Prueba', 'Test', 'Mock', 'Fake','prueba', 'test', 'mock', 'fake'];

    if(invalidNames.includes(value)) {
        return {
            invalidName: {
                message: 'Invalid article name, it contains forbidden words'
            }
        }
    }

    return null;
  };
}
