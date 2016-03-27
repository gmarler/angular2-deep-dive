import {Component, ElementRef} from '@angular/core';

import {Track, API_RESULTS} from './data';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public tracks: Track[];
  constructor() {
    this.tracks = API_RESULTS.results;
  }
}
