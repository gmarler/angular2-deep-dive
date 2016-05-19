import {Injectable, Inject, Optional} from '@angular/core';
import {Jsonp, JSONP_PROVIDERS, URLSearchParams, RequestOptions} from '@angular/http';
import {Track, Artist} from '../tracks/track.model';
import 'rxjs/add/operator/map';

export const API_URL = 'https://itunes.apple.com/';


@Injectable()
export class SearchService {
  url = API_URL;

  constructor(private jsonp:Jsonp, private ro:RequestOptions, @Optional() @Inject('CONFIGURABLE_API_URL') url:string) {
    if(url) {
      this.url = url;
    }
  }

  getSong(id:string):Promise<Track> {
    return this._getThing<Track>(id, Track);
  }

  getArtist(id:string|number) {
    return this._getThing<Artist>(id.toString(), Artist);
  }

  search(term:string):Promise<Track[]> {
    let params = this.ro.search || new URLSearchParams();
    params.set('term', term);
    return this._makeCall('search', params)
      .then((results) => results.map((item) => Track.fromJson(item)));
  }

  private _makeCall(endpoint:string, params:URLSearchParams):Promise<any[]> {
    return new Promise((resolve) => {
      this.jsonp.get(`${this.url}${endpoint}`, {
        search: params
      })
      .map((response) => response.json().results)
      .subscribe(resolve);
    });
  }

  private _getThing<T>(id:string, T):Promise<T>  {
    let params = this.ro.search;
    params.delete('term');
    params.set('id', id);
    return this._makeCall('lookup', params)
      .then((results) => <T>T.fromJson(results[0]));
  }
}
