import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';
import {SearchService} from '../../search/search.service';

@Component({
  selector: 'track-artist',
  styles: [
    `.name {
      font-size: 20px;
      font-weight: bold;
    }`
  ],
  template: `Artist details for <b>{{track.trackName}}</b>:
    <p class="name">{{track.artist.artistName}}</p>
    <p>Main genre: {{track.artist.primaryGenreName}}
  `
})
export class TrackArtistComponent {
  track = new Track();
  constructor(private trackHolder:TrackHolder, private searchService:SearchService) {
  }

  ngOnInit() {
    this.trackHolder.track
      .then(track => this.track = track)
      .then(() => {
        this.searchService.getArtist(this.track.artistId)
          .then(artist => this.track.artist = artist);
      });
  }
}
