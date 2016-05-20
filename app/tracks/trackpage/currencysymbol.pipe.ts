import {Pipe, PipeTransform} from '@angular/core';
import {COUNTRIES} from '../../settings/settings.service';

@Pipe({
  name: 'symbol'
})
export class CurrencySymbol implements PipeTransform {
  transform(value:string):string {
    let symbol = '';
    for(let c in COUNTRIES) {
      if(COUNTRIES[c].currency === value) {
        symbol = COUNTRIES[c].currencySymbol;
      }
    }
    return symbol || value;
  }
}
