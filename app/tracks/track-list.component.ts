import {Component, provide, Output, EventEmitter, Inject, ViewChildren, QueryList} from '@angular/core';
import {SearchService} from '../search/search.service';
import {JsonpOptions} from '../jsonp/jsonp.options';
import {RequestOptions} from '@angular/http';
import {Track} from './track.model';
import {TrackComponent} from './track.component';
import {USE_JSONP} from '../config';

@Component({
  selector: 'track-list',
  template: `
  <track-row *ngFor="let trackObj of tracks;" [track-model]="trackObj"></track-row>
  `,
  directives: [TrackComponent],
  providers: [
    SearchService,
    provide(RequestOptions, {
      useClass: JsonpOptions
    })
  ],
})
export class TrackListComponent {
  tracks:Track[];
  @Output('search-complete') searchComplete = new EventEmitter();
  @ViewChildren(TrackComponent) trackComponents:QueryList<TrackComponent>;

  constructor(private searchService:SearchService) {
  }

  search(term:string):Promise<void> {
    return this.searchService.search(term).then((items) => {
      this.tracks = items;
      this.searchComplete.emit(term);
    });
  }
}
