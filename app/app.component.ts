import {Component, ElementRef} from '@angular/core';
import {Track} from './tracks/track.model';
import {SearchBarComponent} from './search/searchbar.component';
import {SearchService} from './search/search.service';
import {TrackComponent} from './tracks/track.component';
import {JSONP_PROVIDERS} from '@angular/http';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent, TrackComponent],
  providers: [JSONP_PROVIDERS, SearchService]
})
export class ItunesAppComponent {
  public tracks:Track[] = [];
  public searchTerm = '';
  public typedTerm = '';

  constructor(private searchService:SearchService) {
  }

  runTheSearch(term:string) {
    this.searchService.search(term).subscribe((items) => this.tracks = items);
  }
}
