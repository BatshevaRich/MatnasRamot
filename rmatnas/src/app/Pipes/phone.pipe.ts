import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any): any {
    return value.substr(0,3) + '-' + value.substr(3, value.length - 1);
  }

}
