import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';

@Component({
  selector: 'track-album',
  template: `Album details for song {{track.trackName}}`
})
export class TrackAlbumComponent {
  track = new Track();
  constructor(private trackHolder:TrackHolder) {
  }

  ngOnInit() {
    this.trackHolder.track
      .then(track => this.track = track);
  }
}
