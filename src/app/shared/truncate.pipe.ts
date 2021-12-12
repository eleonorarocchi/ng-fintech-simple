import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string): string {
    if(value.length >= 14)
      return value.substring(0, 14) + "...";
    else
      return value;
  }
}
