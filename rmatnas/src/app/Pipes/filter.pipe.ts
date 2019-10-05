import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const res = [];
    value.forEach(element => {
      if (element.lastName) {
        if (element.lastName.indexOf(args) !== -1) { res.push(element); }
      }
      if (element.name) {
        if (element.name.indexOf(args) !== -1) { res.push(element); }
      }
      if (element.description) {
        if (element.description.indexOf(args) !== -1) { res.push(element); }
      }
    });
    return res;
  }
}
