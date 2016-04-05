import {Component, ElementRef} from '@angular/core';

import {Track, API_RESULTS} from './data';
import {SearchBarComponent} from './search/searchbar.component';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent]
})
export class ItunesAppComponent {
  public tracks:Track[];
  public searchTerm:string;
  constructor() {
    this.tracks = API_RESULTS.results;
    this.searchTerm = '';
  }
  executeSearch(term:string, event:MouseEvent) {
    console.log(term);
    if(event.shiftKey) {
      this.searchTerm = '';
    }
  }
  searchTermChanged() {
    console.log('changed');
  }
}
