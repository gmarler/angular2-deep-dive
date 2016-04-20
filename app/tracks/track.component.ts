import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {COLORS} from '../styles/colors';
import {BUTTONS} from '../styles/buttons';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from '../tracks/data';


@Component({
  selector: 'cool-audio',
  styles: [BUTTONS],
  template: `
  <div>
    <audio controls>
      <ng-content select="source"></ng-content>
    </audio>
    <ng-content select=".playbutton"></ng-content>
    <ng-content select="[stopbutton]"></ng-content>
  </div>
  `
})
class CoolAudio  {
}

@Component({
  selector: 'track-row',
  directives: [CoolAudio],
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
    }
    `
  ],
  template: `
  <div class="row">
    <div class="col-xs-3">
      <img [src]="track.artworkUrl100">
    </div>
    <div class="col-xs-8">
      <p class="track" [innerText]="track.trackName"></p>
      <p class="album" [innerHtml]="'<i>'+track.collectionName+'</i>'"></p>
    </div>
    <div class="col-xs-12">
      <cool-audio>
        <button class="playbutton">Go!</button>
        <source [src]="track.previewUrl" type="audio/mp4">
        <source [src]="track.previewUrl" type="audio/mp4">
        <button stopbutton>Halt</button>
      </cool-audio>
    </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.Native
})
export class TrackComponent {
  @Input('track-model') track: Track;
}
