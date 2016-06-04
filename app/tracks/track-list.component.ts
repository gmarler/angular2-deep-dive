import {Component, provide, Output, Input, EventEmitter, Inject,
  ViewChildren, QueryList,
  ChangeDetectionStrategy, ChangeDetectorRef,
  OnInit, AfterViewChecked,
  Pipe, PipeTransform
} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Track} from './track.model';
import {TrackComponent} from './track.component';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {USE_JSONP} from '../config';

@Component({
  selector: 'track-list',
  template: `
  <track-row (track-clicked)="onTrackClicked($event)" (artist-clicked)="onArtistClicked($event)" *ngFor="let trackObj of tracks;" [track-model]="trackObj" [date-format]="dateFormat"></track-row>
  `,
  directives: [TrackComponent, ROUTER_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provide('DirectSearchService', {
      useExisting: SearchService
    }),
    provide('CONFIGURABLE_API_URL', {useValue: 'http://redapesolutions.com/itunes/'}),
    provide('ProxiedSearchService', {
      useClass: SearchService
    })
  ]
})
export class TrackListComponent implements OnInit {
  tracks:Track[];
  @Output('search-complete') searchComplete = new EventEmitter();
  @ViewChildren(TrackComponent) trackComponents:QueryList<TrackComponent>;

  constructor(@Inject('DirectSearchService') private searchService:SearchService, @Inject('ProxiedSearchService') private proxiedService:SearchService, private router:Router, private cd:ChangeDetectorRef) {
  }

  ngOnInit() {
    this.tracks = this.searchService.tracks;
  }

  search(term:string):Promise<void> {
    return Promise.race([
      this.searchService.search(term),
      this.proxiedService.search(term)
    ]).then((items) => {
      console.log('One is done');
      this.tracks = items;
      this.searchComplete.emit(term);
      this.cd.markForCheck();
    });
  }

  onTrackClicked(track:Track) {
    this.router.navigate(['/track', track.trackId, 'details']);
  }

  onArtistClicked(track:Track) {
    this.router.navigate(['/track', track.trackId, 'artist']);
  }
}
