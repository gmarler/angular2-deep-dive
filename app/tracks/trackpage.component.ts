import {Component, Injectable} from '@angular/core';
import {RouteSegment, OnActivate, Routes, ROUTER_DIRECTIVES} from '@angular/router';

@Injectable()
class TrackHolder {
  trackId:number;
}

@Component({
  template: `More information about the song`
})
class TrackDetailsComponent {
  constructor(track:TrackHolder) {
  }
}

@Component({
  template: `Artist details`
})
class TrackArtistComponent {
  constructor(track:TrackHolder) {
  }
}

@Component({
  template: `
    Here's the id: {{id}}. What do you want to see?
    <div>
    <div>
  `,
  directives: [],
  providers: [TrackHolder]
})
export class TrackPageComponent {
  id:number;
  constructor(private track:TrackHolder) {}
}
