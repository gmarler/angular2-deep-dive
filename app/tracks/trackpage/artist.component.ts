import {Component} from '@angular/core';
import {TrackHolder} from './track.service';
import {Track} from '../track.model';
import {SearchService} from '../../search/search.service';
import {SettingsService} from '../../settings/settings.service';
import {CurrencySymbol} from './currencysymbol.pipe';

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
  template: `
  <div *ngIf="track">
  Artist details for <b>{{track.trackName}}</b>:
    <p class="name">{{track.artist.artistName}}</p>
    <p>Main genre: {{track.artist.primaryGenreName}}</p>
    <h4>Albums</h4>
    <ul>
      <li *ngFor="let album of track.artist?.albums">
        <div class="col-xs-3">
          <img [src]="album.artworkUrl60">
        </div>
        <div class="col-xs-8">
          <p class="album">{{album.collectionName}}</p>
          <p>Price: {{album.collectionPrice|symbol:album.currency:false}}</p>
        </div>
      </li>
    </ul>
  </div>
  `
})
export class TrackArtistComponent {
  track:Track;
  constructor(private trackHolder:TrackHolder) {
  }

  ngOnInit() {
    this.trackHolder.track.then(track => this.track = track);
  }
}
