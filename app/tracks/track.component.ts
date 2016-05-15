import {Component, Input, ElementRef, Injectable, Inject, provide, Output, EventEmitter} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {COLORS} from '../styles/colors';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from './track.model';
import {CoolAudio} from './cool-audio.component';

@Injectable()
export class TrackHolder {
  track:Track;
  artistClicked:EventEmitter<Track>;
  trackClicked:EventEmitter<Track>;
  emitArtist() {
    this.artistClicked.emit(this.track);
  }
  emitTrack() {
    this.trackClicked.emit(this.track);
  }
}

@Component({
  selector: 'track-details',
  template: `
  <div class="col-xs-8">
    <p class="track" (click)="trackHolder.emitTrack()" [innerText]="trackHolder.track.trackName"></p>
    <p class="artist" (click)="trackHolder.emitArtist()" [innerText]="trackHolder.track.artistName"></p>
    <p class="album" [innerText]="trackHolder.track.collectionName"></p>
  </div>
  `,
  styles: [
    BOOTSTRAP_CORE,
    GRID,
    `    .track {
          font-size: 120%;
          margin-bottom: 0;
        }

        .album {
          line-height: 16px;
          font-style: italic;
        }
        .artist {
          font-weight: bold;
        }
        `
  ]
})
class TrackDetails {
  constructor(private trackHolder:TrackHolder) {
  }
}

@Component({
  selector: 'track-image',
  template: `
  <div class="col-xs-3">
    <img [src]="trackHolder.track.artworkUrl100" (click)="trackHolder.emitTrack()">
  </div>
  `,
  styles: [
    GRID
  ]
})
class TrackImage {
  constructor(private trackHolder:TrackHolder) {
  }
}

@Component({
  selector: 'track-row',
  directives: [TrackDetails, TrackImage],
  styles: [
    BOOTSTRAP_CORE,
    GRID,
    `
    .row {
      margin-top: 5px;
      margin-bottom: 5px;
      border-bottom: dotted 1px ${COLORS.quinary};
    }
    `
  ],
  template: `
  <div class="row">
    <track-image></track-image>
    <track-details></track-details>
  </div>
  `,
  providers: [TrackHolder]
})
export class TrackComponent {
  @Input('track-model') track: Track;
  @Output('track-clicked') trackClicked = new EventEmitter<Track>();
  @Output('artist-clicked') artistClicked = new EventEmitter<Track>();

  constructor(private trackHolder:TrackHolder) {
  }

  ngOnInit() {
    this.trackHolder.track = this.track;
    this.trackHolder.trackClicked = this.trackClicked;
    this.trackHolder.artistClicked = this.artistClicked;
  }
}
