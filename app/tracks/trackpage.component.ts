import {Component, Injectable} from '@angular/core';
import {RouteSegment, OnActivate, Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

@Injectable()
class TrackHolder {
  trackId:string;
}

@Component({
  template: `More information about the song {{id}}`
})
class TrackDetailsComponent {
  id:string;
  constructor() {
  }
}

@Component({
  selector: 'track-artist',
  template: `Artist details for song {{id}}`
})
class TrackArtistComponent {
  id:string;
  constructor() {
  }
}

@Component({
  selector: 'track-album',
  template: `Album details for song {{id}}`
})
class TrackAlbumComponent {
  id:string;
  constructor() {
  }
}

@Component({
  template: `
    Here's the id: {{id}}. What would you like to see?
    <a>Details</a>
    <a>Artist</a>
    <a>Album</a>
    <a>Back to search</a>
    <div>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: []
})
export class TrackPageComponent implements OnActivate {
  id:string;
  constructor() {}

  routerOnActivate(segment:RouteSegment) {
    this.id = segment.getParam('id');
  }
}
