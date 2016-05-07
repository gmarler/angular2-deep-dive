import {Component, ElementRef} from '@angular/core';
import {Http} from '@angular/http';
import {Track} from './tracks/track.model';
import {SearchBarComponent} from './search/searchbar.component';
import {TrackComponent} from './tracks/track.component';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent, TrackComponent]
})
export class ItunesAppComponent {
  public tracks:Track[] = [];
  public searchTerm = '';
  public typedTerm = '';

  constructor(private http:Http) {
  }

  runTheSearch(term:string) {
    // API url
    this.http.get(`http://redapesolutions.com/itunes?entity=musicTrack&term=${term}`)
      .subscribe((response) => this.tracks = response.json().results);
  }
}
