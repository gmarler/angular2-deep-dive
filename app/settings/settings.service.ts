import {Injectable} from '@angular/core';

export interface Country {
  name:string;
  currency:string;
  code:string;
  currencySymbol?:string;
}

export const COUNTRIES:{[property:string]:Country} = {
  US: {
    name: 'United States of America',
    currency: 'USD',
    code: 'US',
    currencySymbol: '$'
  },
  GB: {
    name: 'United Kingdom',
    currency: 'GBP',
    code: 'GB',
    currencySymbol: '£',
  },
  CH: {
    name: 'Switzerland',
    currency: 'CHF',
    code: 'CH'
  }
};

@Injectable()
export class SettingsService {
  private holder: 'ITUNES_BROWSER_COUNTRY';
  private _country:Country;

  get country():Country {
    // Not loaded yet
    if(!this._country) {
      const code:string = window.localStorage.getItem(this.holder) || 'US';
      return COUNTRIES[code];
    }
    return this._country;
  }

  setByCode(code:string) {
    this._country = COUNTRIES[code];
    window.localStorage.setItem(this.holder, code);
  }
}
