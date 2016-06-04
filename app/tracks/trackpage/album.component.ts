import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';

@Component({
  selector: 'track-album',
  template: `
  <div *ngIf="track">
  <h3>Album details for song {{track.trackName}}</h3>
  </div>
  `
})
export class TrackAlbumComponent {
  track:Track;
  constructor(private trackHolder:TrackHolder) {
  }

  ngOnInit() {
    this.trackHolder.track
      .then(track => this.track = track);
  }
}
