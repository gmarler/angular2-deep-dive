import {Component, Input, ElementRef, Injectable, Inject} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {COLORS} from '../styles/colors';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from './track.model';
import {CoolAudio} from './cool-audio.component';
import {USE_JSONP} from '../config';
import {Logger} from '../logger';

@Component({
  selector: 'track-details',
  template: `
  <div class="col-xs-8">
    <p class="track" [innerText]="track.trackName"></p>
    <p class="album" [innerHtml]="'<i>'+track.collectionName+'</i>'"></p>
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
        }`
  ]
})
class TrackDetails {
  @Input('track') track: Track;

  constructor() {
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'track-image',
  template: `
  <div class="col-xs-3">
    <img [src]="track.artworkUrl100">
  </div>
  `,
  styles: [
    GRID
  ]
})
class TrackImage {
  @Input('track') track: Track;

  constructor() {
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
    <track-image [track]="track"></track-image>
    <track-details [track]="track"></track-details>
  </div>
  `
})
export class TrackComponent {
  @Input('track-model') track: Track;

  constructor(@Inject(USE_JSONP) useJsonp:boolean) {
    console.log(`Track row: ${useJsonp}`);
  }

  ngOnInit() {
  }
}
