import {Component, ElementRef} from '@angular/core';
import {Track, API_RESULTS} from './tracks/data';
import {SearchBarComponent} from './search/searchbar.component';
import {TrackComponent} from './tracks/track.component';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent, TrackComponent]
})
export class ItunesAppComponent {
  public tracks:Track[] = API_RESULTS.results;
  public searchTerm:string = '';

  searchTermChanged() {
    console.log('changed');
  }
}
