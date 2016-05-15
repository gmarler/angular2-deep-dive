import {Component, Injectable} from '@angular/core';
import {RouteSegment, OnActivate, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {OpaqueToken} from '@angular/core';

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
    <a [routerLink]="['./details']">Song details</a>
    <a [routerLink]="['./artist']">Artist</a>
    <div>
      <router-outlet></router-outlet>
    <div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [TrackHolder]
})
@Routes([
  {path: '/details', component: TrackDetailsComponent},
  {path: '/artist', component: TrackArtistComponent}
])
export class TrackPageComponent implements OnActivate {
  id:number;
  constructor(private track:TrackHolder) {}
  routerOnActivate(routeSegment:RouteSegment) {
    this.id = parseInt(routeSegment.getParam('id'), 10);
    this.track.trackId = this.id;
  }
}
