import {Injectable} from '@angular/core';
import {Jsonp, JSONP_PROVIDERS, URLSearchParams, RequestOptions} from '@angular/http';
import {Track} from '../tracks/track.model';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

export const API_URL = 'https://itunes.apple.com/search';

@Injectable()
export class SearchService {
  url = API_URL;
  constructor(private jsonp:Jsonp) {
  }
  search(term:string):Observable<Track[]> {
    // API url
    // https://itunes.apple.com/search
    let params = new URLSearchParams();
    params.set('term', term);
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp.get(this.url, {
      search: params
    })
      .map((response) => response.json().results);
  }
}
