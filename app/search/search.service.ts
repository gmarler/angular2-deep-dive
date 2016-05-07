import {Injectable} from '@angular/core';
import {Jsonp, JSONP_PROVIDERS, URLSearchParams, RequestOptions} from '@angular/http';
import {Track} from '../tracks/track.model';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  constructor(private jsonp:Jsonp) {
  }
  search(term:string) {
    // API url
    // https://itunes.apple.com/search
    let params = new URLSearchParams();
    params.set('term', term);
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp.get('https://itunes.apple.com/search', {
      search: params
    })
      .map((response) => response.json().results);
  }
}
