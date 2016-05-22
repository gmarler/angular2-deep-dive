import {Component, provide, Output, Input, EventEmitter, Inject, ViewChildren, QueryList,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Pipe, PipeTransform,
  OnInit
} from '@angular/core';
import {SearchService} from '../search/search.service';
import {Track} from './track.model';
import {TrackComponent} from './track.component';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {USE_JSONP} from '../config';

@Component({
  selector: 'track-list',
  template: `
  <div>
  Filter by:
  <input type="radio" (click)="filterByType = 'all'; filters.type = 'all'" name="filterByType" checked="checked">All
  <input type="radio" (click)="filterByType = 'feature-movie'; filters.type = 'feature-movie'" name="filterByType">Movies
  <input type="radio" (click)="filterByType = 'song'; filters.type = 'song'" name="filterByType">Songs
  </div>
  <div class="col-xs-6">
    <track-row (track-clicked)="onTrackClicked($event)" (artist-clicked)="onArtistClicked($event)" *ngFor="let trackObj of (tracks | filterType:filterByType);" [track-model]="trackObj"></track-row>
  </div>
  <div class="col-xs-6">
    <track-row (track-clicked)="onTrackClicked($event)" (artist-clicked)="onArtistClicked($event)" *ngFor="let trackObj of (tracks | badFilter:filters);" [track-model]="trackObj"></track-row>
  </div>
  `,
  directives: [TrackComponent, ROUTER_DIRECTIVES],
  providers: [],
  pipes: []
})
export class TrackListComponent implements OnInit {
  tracks:Track[];
  filterByType = 'all';
  filters = {
    type: 'all'
  };
  @Output('search-complete') searchComplete = new EventEmitter();
  @ViewChildren(TrackComponent) trackComponents:QueryList<TrackComponent>;

  constructor(private searchService:SearchService, private router:Router) {
  }

  ngOnInit() {
    this.tracks = this.searchService.tracks;
  }

  search(term:string):Promise<void> {
    return this.searchService.search(term).then((items) => {
      this.tracks = items;
      this.searchComplete.emit(term);
    });
  }

  onTrackClicked(track:Track) {
    this.router.navigate(['/track', track.trackId, 'details']);
  }

  onArtistClicked(track:Track) {
    this.router.navigate(['/track', track.trackId, 'artist']);
  }
}
