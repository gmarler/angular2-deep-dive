import {Injectable, Inject, Optional} from '@angular/core';
import {Jsonp, JSONP_PROVIDERS, URLSearchParams, RequestOptions} from '@angular/http';
import {Track, Artist, Album} from '../tracks/track.model';
import {SettingsService} from '../settings/settings.service';
import 'rxjs/add/operator/map';

export const API_URL = 'https://itunes.apple.com/';


@Injectable()
export class SearchService {
  url = API_URL;
  tracks:Track[] = [];
  constructor(private settingsService:SettingsService, private jsonp:Jsonp, private ro:RequestOptions, @Optional() @Inject('CONFIGURABLE_API_URL') url:string) {
    if(url) {
      this.url = url;
    }
  }

  getSong(id:string):Promise<Track> {
    return this._getThing<Track>(id, Track);
  }

  // Note that TypeScript infers the return type if only one return (or all returns have the same type) so we don't have to specify it ourselves if we don't want to
  getArtist(id:string|number) {
    return this._getThing<Artist>(id.toString(), Artist);
  }

  loadAlbums(id:string|number) {
    let params = new URLSearchParams();
    params.set('entity', 'album');
    params.set('id', id.toString());
    return this._makeCall('lookup', params)
      .then(results => results.filter(item => item.wrapperType === 'collection'))
      .then(results => results.map(item => Album.fromJson(item)));
  }

  search(term:string):Promise<Track[]> {
    let params = new URLSearchParams();
    params.set('term', term);
    return this._makeCall('search', params)
      .then((results) => results.map((item) => Track.fromJson(item)))
      .then(tracks => {
        this.tracks = tracks;
        return tracks;
      });
  }

  private _makeCall(endpoint:string, params:URLSearchParams):Promise<any[]> {
    // Use JsonpOptions' params and just add all new ones
    params.appendAll(this.ro.search);
    params.set('country', this.settingsService.country.code);
    return new Promise((resolve) => {
      this.jsonp.get(`${this.url}${endpoint}`, {
        search: params
      })
      .map((response) => response.json().results)
      .subscribe(resolve);
    });
  }

  private _getThing<T>(id:string, T):Promise<T>  {
    let params = new URLSearchParams();
    params.set('id', id);
    return this._makeCall('lookup', params)
      .then((results) => <T>T.fromJson(results[0]));
  }
}
