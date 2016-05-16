import {Component, Injectable} from '@angular/core';
import {RouteSegment, OnActivate, Routes, ROUTER_DIRECTIVES} from '@angular/router';

@Injectable()
class TrackHolder {
  trackId:string;
}

@Component({
  template: `More information about the song`
})
class TrackDetailsComponent {
  constructor(track:TrackHolder) {
  }
}

@Component({
  selector: 'track-artist',
  template: `Artist details for song ... we need the id here...`
})
class TrackArtistComponent {
  constructor() {
  }
}

@Component({
  template: `
    Here's the id: {{id}}.
    <track-artist></track-artist>
    <div>
  `,
  directives: [TrackArtistComponent],
  providers: []
})
export class TrackPageComponent implements OnActivate {
  id:string;
  constructor() {}

  routerOnActivate(segment:RouteSegment) {
    this.id = segment.getParam('id');
  }
}
