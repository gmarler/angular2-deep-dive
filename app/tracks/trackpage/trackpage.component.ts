import {Component, Injectable} from '@angular/core';
import {RouteSegment, OnActivate, Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {SearchService} from '../../search/search.service';
import {TrackHolder} from './track.service';
import {COLORS} from '../../styles/colors';
import {TrackDetailsComponent} from './details.component';
import {TrackAlbumComponent} from './album.component';
import {TrackArtistComponent} from './artist.component';

@Component({
  template: `
    <div class="links">
      <a routerLink="./details">Details</a>
      <a routerLink="./artist">Artist</a>
      <a routerLink="./album">Album</a>
      <a routerLink="/search">Back to search</a>
    </div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
    a[routerLink] {
      padding: 10px;
      background-color: ${COLORS.tertiary};
      color: ${COLORS.quinary};
    }
    a[routerLink].router-link-active {
      color: ${COLORS.tertiary};
      background-color: ${COLORS.quinary};
    }
    .links {
      margin-bottom: 20px;
    }`
  ],
  directives: [ROUTER_DIRECTIVES],
  providers: [TrackHolder]
})
@Routes([
  {path: '/details', component: TrackDetailsComponent},
  {path: '/artist', component: TrackArtistComponent},
  {path: '/album', component: TrackAlbumComponent}
])
export class TrackPageComponent implements OnActivate {
  constructor(private trackHolder:TrackHolder, private searchService:SearchService) {}

  routerOnActivate(segment:RouteSegment) {
    this.trackHolder.id = segment.getParam('id');
  }
}
