import {Pipe, PipeTransform} from '@angular/core';
import {COUNTRIES} from '../../settings/settings.service';

@Pipe({
  name: 'symbol'
})
export class CurrencySymbol implements PipeTransform {
  transform(amount:string, currencyCode:string, before?:boolean):string {
    let symbol = '';
    for(let c in COUNTRIES) {
      if(COUNTRIES[c].currency === currencyCode) {
        symbol = COUNTRIES[c].currencySymbol;
      }
    }
    symbol = symbol || currencyCode;
    let template = '';
    if(before) {
      return `${symbol}${amount}`;
    } else {
      return `${amount}${symbol}`;
    }
  }
}
