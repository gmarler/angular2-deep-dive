import {Injectable} from '@angular/core';

@Injectable()
export class HistoryService {
  searches:string[] = [];

  MAX = 5;

  add(term:string):void {
    this.searches.unshift(term);
    this.searches.splice(this.MAX, 1);
  }
}