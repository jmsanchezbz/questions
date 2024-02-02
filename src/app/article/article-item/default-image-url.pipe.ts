import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImageUrl',
})
export class DefaultImageUrlPipe implements PipeTransform {

  readonly defaultImageUrl : string = 'assets/images/default-coke.jpg';

  transform(value: string) {
    
    if (value === '') {
      return this.defaultImageUrl;
    }

    return value;
  }

  /*
   *  Opción con parámetro del pipe 
   *
  transform(value: string, defaultImageUrl: string) {
    
    if (value === '') {
      return defaultImageUrl;
    }

    return value;
  }*/
}
