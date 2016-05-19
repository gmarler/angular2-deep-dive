import {Component, provide, Output, Input, EventEmitter, Inject, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef,
  AfterViewChecked,
  AfterViewInit,
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
  <track-row (track-clicked)="onTrackClicked($event)" (artist-clicked)="onArtistClicked($event)" *ngFor="let trackObj of tracks;" [track-model]="trackObj"></track-row>
  `,
  directives: [TrackComponent, ROUTER_DIRECTIVES],
  providers: [],
})
export class TrackListComponent implements AfterViewInit, OnInit, AfterViewChecked {
  tracks:Track[];
  @Output('search-complete') searchComplete = new EventEmitter();
  @ViewChildren(TrackComponent) trackComponents:QueryList<TrackComponent>;

  constructor(private searchService:SearchService, private router:Router) {
  }

  ngOnInit() {
    console.log('Init', this.trackComponents);
  }
  ngAfterViewInit() {
    console.log(this.trackComponents.length);
  }
  ngAfterViewChecked() {
    console.log('Checked...', this.trackComponents);
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
