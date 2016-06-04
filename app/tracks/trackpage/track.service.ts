import {Injectable} from '@angular/core';
import {Track, Artist, Album} from '../track.model';
import {SearchService} from '../../search/search.service';
import {InMemoryCache} from '../../search/cache/inmemory';

@Injectable()
export class TrackHolder {
  _track:Track;
  id:string;
  constructor(private searchService:SearchService, private cache:InMemoryCache) {}
  get track():Promise<Track> {
    if(!this._track) {
      // Implement this in 2 different ways:
      // 1. load track then load artist then load albums
      // 2. load track then simultaneously load artist and albums
      return this.searchService.getSong(this.id).then(track => this._track = track);
    }
    return Promise.resolve(this._track);
  }
}
