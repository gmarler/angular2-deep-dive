import {Component, provide, Output, EventEmitter, Inject} from '@angular/core';
import {SearchService} from '../search/search.service';
import {JsonpOptions} from '../jsonp/jsonp.options';
import {RequestOptions} from '@angular/http';
import {Track} from './track.model';
import {TrackComponent, TrackHolder} from './track.component';
import {USE_JSONP} from '../config';
import {Logger, AlertLogger} from '../logger';

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
    }),
    provide(Logger, {
      useFactory: () => {
        return new AlertLogger();
      }
    })
  ],
})
export class TrackListComponent {
  tracks:Track[];
  @Output('search-complete') searchComplete = new EventEmitter();

  constructor(private searchService:SearchService, @Inject(USE_JSONP) useJsonp:boolean, private logger:Logger) {
    logger.log('Hello again');
  }

  search(term:string):void {
    this.searchService.search(term).subscribe((items) => {
      this.tracks = items;
      this.searchComplete.emit(term);
    });
  }
}
