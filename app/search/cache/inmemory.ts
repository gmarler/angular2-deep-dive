import {Injectable} from '@angular/core';

@Injectable()
export class InMemoryCache {
  private _values: any = {};
  get(key: string): Promise<any> {
    if(key in this._values) {
      return Promise.resolve(this._values[key]);
    } else {
      return Promise.reject(key);
    }
  }

  set(key: string, value: any): void {
    this._values[key] = value;
  }
}
