import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[] | null, filter: Record<string, any>): any {
    if (!items || !filter) {
      return items;
    }

    const key = Object.keys(filter)[0];
    const value:string = filter[key];

    return items.filter((e) => (e[key] as string || "").toUpperCase().indexOf(value.toUpperCase()) !== -1);
  }

}
