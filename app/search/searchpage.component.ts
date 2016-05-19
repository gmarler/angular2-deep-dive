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
export class SearchPageComponent implements CanDeactivate {
  typedTerm:string;
  @ViewChild(TrackListComponent) list:TrackListComponent;
  constructor() {}

  routerCanDeactivate():Promise<boolean> {
    console.log('Loading');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Done loading');
        resolve(true);
      }, 3);
    });
  }

  routerOnActivate(segment:RouteSegment) {
    this.typedTerm = segment.getParam('term') || '';
  }

  runTheSearch(term:string) {
    this.list.search(term);
  }
}
