import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuta'
})
export class ValutaPipe implements PipeTransform {

  transform(value: number): string {
    return '€ ' + value;
  }

}
