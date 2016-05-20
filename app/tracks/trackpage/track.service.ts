import {Injectable} from '@angular/core';
import {Track} from '../track.model';
import {SearchService} from '../../search/search.service';

@Injectable()
export class TrackHolder {
  _track:Track;
  id:string;
  constructor(private searchService:SearchService) {}
  get track():Promise<Track> {
    if(!this._track) {
      return this.searchService.getSong(this.id).then(track => this._track = track);
    }
    return Promise.resolve(this._track);
  }
}
