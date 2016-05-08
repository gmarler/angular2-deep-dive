import {Injectable, Inject, Optional} from '@angular/core';
import {Jsonp, JSONP_PROVIDERS, URLSearchParams, RequestOptions} from '@angular/http';
import {Track} from '../tracks/track.model';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

export const API_URL = 'https://itunes.apple.com/search';

@Injectable()
export class SearchService {
  url = API_URL;
  constructor(private jsonp:Jsonp, private ro:RequestOptions, @Optional() @Inject(API_URL) url:string) {
    if(url) {
      this.url = url;
    }
  }
  search(term:string):Observable<Track[]> {
    let params = this.ro.search || new URLSearchParams();
    params.set('term', term);
    return this.jsonp.get(this.url, {
      search: params
    })
      .map((response) => response.json().results);
  }
}
