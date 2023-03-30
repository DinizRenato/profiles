import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    value = "+1" + value;

    const countryCodeStr = value.slice(0, 2);
    const areaCodeStr = value.slice(2, 5);
    const midSectionStr = value.slice(5, 8);
    const lastSectionStr = value.slice(8);

    return `${countryCodeStr} (${areaCodeStr}) ${midSectionStr}-${lastSectionStr}`;
  }

}
