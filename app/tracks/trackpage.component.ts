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
    <a [routerLink]="['./details']">Details</a>
    <a [routerLink]="['./artist']">Artist</a>
    <a [routerLink]="['./album']">Album</a>
    <a [routerLink]="['../../search']">Back to search</a>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: []
})
@Routes([
  {path: '/details', component: TrackDetailsComponent},
  {path: '/artist', component: TrackArtistComponent},
  {path: '/album', component: TrackAlbumComponent}
])
export class TrackPageComponent implements OnActivate {
  id:string;
  constructor() {}

  routerOnActivate(segment:RouteSegment) {
    this.id = segment.getParam('id');
  }
}
