import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: false
})
export class FormatPricePipe implements PipeTransform {

  transform(value: string | number): string {

    // Convertir si es string a numero
    if (typeof value === 'string') {
      value = parseFloat(value);
    }

    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
