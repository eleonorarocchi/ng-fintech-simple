import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lightcurrency',
  pure: false
})
export class LightCurrencyPipe implements PipeTransform {
  constructor() {}

  transform(amount: number): string {
    return "€ " + amount
  }
}