import {Component, Input, ViewChild, AfterViewInit, OnChanges} from '@angular/core';
import {SearchBarComponent} from './searchbar.component';
import {TrackListComponent} from '../tracks/track-list.component';
import {Router, RouteSegment, OnActivate, CanDeactivate, RouteTree} from '@angular/router';

@Component({
  template: `
    <search-bar [(term)]="typedTerm" class="form-group" (execute-search)="runTheSearch($event)"></search-bar>
    <track-list></track-list>`,
  directives: [SearchBarComponent, TrackListComponent]
})
export class SearchPageComponent {
  typedTerm:string;
  @ViewChild(TrackListComponent) list:TrackListComponent;
  constructor() {}

  routerOnActivate(segment:RouteSegment) {
    this.typedTerm = segment.getParam('term') || '';
  }

  runTheSearch(term:string) {
    this.list.search(term);
  }
}
