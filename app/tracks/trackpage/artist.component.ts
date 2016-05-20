import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';
import {SearchService} from '../../search/search.service';
import {SettingsService} from '../../settings/settings.service';

@Component({
  selector: 'track-artist',
  styles: [
    `.name {
      font-size: 20px;
      font-weight: bold;
    }
    li {
      list-style-type: none;
    }
    .album {
      font-weight: bold;
      font-size: 15px;
    }`
  ],
  template: `Artist details for <b>{{track.trackName}}</b>:
    <p class="name">{{track.artist?.artistName}}</p>
    <p>Main genre: {{track.artist?.primaryGenreName}}</p>
    <h4>Albums</h4>
    <ul>
      <li *ngFor="let album of track.artist?.albums">
        <div class="col-xs-3">
          <img [src]="album.artworkUrl60">
        </div>
        <div class="col-xs-8">
          <p class="album">{{album.collectionName}}</p>
          <p>Price: {{album.collectionPrice}}{{album.currency}}</p>
        </div>
      </li>
    </ul>
  `
})
export class TrackArtistComponent {
  track = new Track();
  constructor(private settingsService:SettingsService, private trackHolder:TrackHolder, private searchService:SearchService) {
  }

  ngOnInit() {
    this.trackHolder.track
      .then(track => this.track = track)
      .then(() => {
        return this.searchService.getArtist(this.track.artistId)
          .then(artist => this.track.artist = artist);
      })
      .then(() => {
        this.searchService.loadAlbums(this.track.artistId)
          .then(albums => this.track.artist.albums = albums);
      });
  }
}
