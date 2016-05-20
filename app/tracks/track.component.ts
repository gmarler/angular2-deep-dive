import {Directive, Component, Input, ElementRef, Injectable, Inject, provide, Output, EventEmitter} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {COLORS} from '../styles/colors';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from './track.model';
import {CoolAudio} from './cool-audio.component';

@Component({
  selector: 'track-row',
  styles: [
    BOOTSTRAP_CORE,
    GRID,
    `
    .row {
      margin-top: 5px;
      margin-bottom: 5px;
      border-bottom: dotted 1px ${COLORS.quinary};
    }
    .track {
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
  ],
  template: `
  <div class="row">
    <div class="col-xs-3">
      <img [src]="track.artworkUrl100" (click)="trackClicked.emit(track)">
  </div>
    <div class="col-xs-8">
      <p class="track" (click)="trackClicked.emit(track)" [innerText]="track.trackName"></p>
      <p class="artist" (click)="artistClicked.emit(track)" [innerText]="track.artistName"></p>
      <p class="album">
        <span [innerText]="track.collectionName"></span>
        Released: {{track.releaseDate | date:'y'}}
      </p>
    </div>
  </div>
  `
})
export class TrackComponent {
  @Input('track-model') track: Track;
  @Input('date-format') dateFormat:string;
  @Output('track-clicked') trackClicked = new EventEmitter<Track>();
  @Output('artist-clicked') artistClicked = new EventEmitter<Track>();
}
