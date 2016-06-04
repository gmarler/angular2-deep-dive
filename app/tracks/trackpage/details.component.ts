import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';

@Component({
  selector: 'track-details',
  styles: [`.img {
    text-align: center;
  }
  img {
    width: 200px;
  }`],
  template: `
    <div *ngIf="track">
    <h3>Details for song <b>{{track.trackName}}</b></h3>
    <p class="img"><img [src]="track.artworkUrl100"></p>
    <p>Album: {{track.collectionName}}</p>
    </div>
    `
})
export class TrackDetailsComponent {
  track:Track;
  constructor(private trackHolder:TrackHolder) {
  }

  ngOnInit() {
    this.trackHolder.track.then(track => this.track = track);
  }
}
