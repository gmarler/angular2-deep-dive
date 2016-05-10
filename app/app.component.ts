import {Component, ElementRef, provide, ViewChild, Inject} from '@angular/core';
import {Track} from './tracks/track.model';
import {SearchBarComponent} from './search/searchbar.component';
import {SearchService, API_URL} from './search/search.service';
import {TrackListComponent} from './tracks/track-list.component';
import {JSONP_PROVIDERS, URLSearchParams, RequestOptions, BaseRequestOptions} from '@angular/http';
import {USE_JSONP} from './config';
import {Logger} from './logger';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  directives: [SearchBarComponent, TrackListComponent],
  providers: [
    JSONP_PROVIDERS,
    provide(USE_JSONP, {
      useValue: false
    }),
    provide(Logger, {
      useFactory: () => {
        return new Logger('APP', null);
      }
    })
  ],
  template: `
  <header class="navbar">
    <div class="navbar-header navbar-brand">Angular2 Deep Dive</div>
  </header>
  <div class="container form-inline">
    <search-bar [(term)]="typedTerm" class="form-group" (execute-search)="runTheSearch($event)"></search-bar>
    <h3 [hidden]="!searchTerm">Tracks containing "<span [innerText]="searchTerm"></span>"</h3>
    <track-list></track-list>
  </div>
  `
})
export class ItunesAppComponent {
  public tracks:Track[] = [];
  public searchTerm = '';
  public typedTerm = '';
  @ViewChild(TrackListComponent) trackList:TrackListComponent;

  runTheSearch(term:string) {
    this.trackList.search(term);
  }
}
