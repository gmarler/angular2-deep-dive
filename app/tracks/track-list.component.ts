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
  directives: [TrackComponent, ROUTER_DIRECTIVES]
})
export class TrackListComponent implements OnInit {
  tracks:Track[];
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
