import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';

@Component({
  selector: 'track-details',
  template: `Details for song <b>{{track.trackName}}</b>`
})
export class TrackDetailsComponent {
  track = new Track();
  constructor(private trackHolder:TrackHolder) {
  }

  ngOnInit() {
    this.trackHolder.track.then(track => this.track = track);
  }
}
