import {Component, Input, ViewEncapsulation} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from '../tracks/data';

@Component({
  selector: 'track-row',
  styles: [
    BOOTSTRAP_CORE,
    GRID,
    `
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
  </div>
  `,
  encapsulation: ViewEncapsulation.Native
})
export class TrackComponent {
  @Input() track: Track;
}
