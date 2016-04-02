import {Component, ElementRef} from '@angular/core';

import {Track, API_RESULTS} from './data';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public tracks:Track[];
  public searchTerm:string;
  constructor() {
    this.tracks = API_RESULTS.results;
    this.searchTerm = '';
  }
  executeSearch(term:string, event:MouseEvent) {
    console.log('Execute');
    if(event.shiftKey) {
      this.searchTerm = '';
    }
  }
  searchTermChanged() {
    console.log('changed');
  }
}
