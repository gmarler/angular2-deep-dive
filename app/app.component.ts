import {Component, ElementRef} from '@angular/core';

import {Track, API_RESULTS} from './data';
import {SearchBarComponent} from './search/searchbar.component';
import {TrackComponent} from './tracks/track.component';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent, TrackComponent]
})
export class ItunesAppComponent {
  public tracks:Track[];
  public searchTerm:string;
  constructor() {
    this.tracks = API_RESULTS.results;
    this.searchTerm = '';
  }

  searchTermChanged() {
    console.log('changed');
  }
}
