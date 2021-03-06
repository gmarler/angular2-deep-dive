import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class HistoryService {
  searches:string[] = [];
  searchesO:Subject<string[]> = new Subject<string[]>();
  MAX = 5;

  add(term:string):void {
    this.searches.unshift(term);
    this.searches.splice(this.MAX, 1);
    this.searchesO.next(this.searches);
  }
}
