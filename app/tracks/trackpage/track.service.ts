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
      // Try to use cache
      return this.cache.get(this.id)
        // Found in cache, just set
        .then(track => this._track = track)
        // Not found, promise is rejected
        .catch(key => {
          console.log(`Key not found in cache ${key}`);
          // But we can make a rejected promise into a success by returning a resolved promise
          return this.searchService.getSong(this.id)
            // Load track
            .then(track => {
              this._track = track;
              this.cache.set(key, track);
              return track;
            })
            // Then get both artist and albums at the same time
            .then(track => {
              // Issues with Promise.all typing are known https://github.com/Microsoft/TypeScript/issues/5935
              return Promise.all<Artist | Album[]>([
                this.searchService.getArtist(track.trackId),
                this.searchService.loadAlbums(track.artistId)
              ]);
            })
            // Then set artist on track and albums on artist
            // Until Promise.all typing is fixed, we have to explicitely assert artist and album array
            .then(([artist, albums]: [Artist, Album[]]) => {
              this._track.artist = artist;
              artist.albums = albums;
            })
            .then(_ => this._track);
        });
    }
    return Promise.resolve(this._track);
  }
}
