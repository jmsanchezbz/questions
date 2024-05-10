import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToLetter',
  standalone: true
})
export class NumberToLetterPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1 && value <= 4) {
      return String.fromCharCode(value + 64);
    } else {
      return '';
    }
  }

}
