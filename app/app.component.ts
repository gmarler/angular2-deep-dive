import {Component, ElementRef, provide, Injector} from '@angular/core';
import {Track} from './tracks/track.model';
import {SearchBarComponent} from './search/searchbar.component';
import {SearchService, API_URL} from './search/search.service';
import {TrackComponent} from './tracks/track.component';
import {JSONP_PROVIDERS, URLSearchParams, RequestOptions, BaseRequestOptions} from '@angular/http';

class JsonpOptions extends BaseRequestOptions {
  search = new URLSearchParams('callback=JSONP_CALLBACK');
}

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent, TrackComponent],
  providers: [JSONP_PROVIDERS, SearchService, provide(RequestOptions, {
    useClass: JsonpOptions
  })]
})
export class ItunesAppComponent {
  public tracks:Track[] = [];
  public searchTerm = '';
  public typedTerm = '';

  constructor(private searchService:SearchService, injector:Injector) {
    // Uncomment this if you're insterested to see the injector's internal tokens to represent each provider
    // console.log(injector._view);
    // debugger;
    // If using the string 'API_URL' in the DI, look for injector._view._API_URL_0_<some number here>
  }

  runTheSearch(term:string) {
    this.searchService.search(term).subscribe((items) => this.tracks = items);
  }
}
