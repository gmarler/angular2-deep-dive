
export interface Country {
  name:string;
  currency:string;
  code:string;
  currencySymbol?:string;
}

export const COUNTRIES = [
  <Country>{
    name: 'United States of America',
    currency: 'USD',
    code: 'US',
    currencySymbol: '$'
  },
  {
    name: 'United Kingdom',
    currency: 'GBP',
    code: 'GB',
    currencySymbol: '£',
  } as Country,
  {
    name: 'Switzerland',
    currency: 'CHF',
    code: 'CH'
  } as Country
];

export class ProfileModel {
  localisation = {
    country: COUNTRIES.find(item => item.code === 'US'),
    displayCurrencySymbol: true
  };
  details = {
    firstName: '',
    lastName: '',
    initials: ''
  };
  historyMax = 5;
  constructor(public name:string) {}
}
