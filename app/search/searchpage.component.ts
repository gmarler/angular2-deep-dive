import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {SearchBarComponent} from './searchbar.component';
import {TrackListComponent} from '../tracks/track-list.component';
import {Router, RouteSegment, OnActivate} from '@angular/router';

@Component({
  template: `
    <search-bar [(term)]="typedTerm" class="form-group" (execute-search)="runTheSearch($event)"></search-bar>
    <track-list></track-list>`,
  directives: [SearchBarComponent, TrackListComponent]
})
export class SearchPageComponent {
  typedTerm = '';
  @ViewChild(TrackListComponent) list:TrackListComponent;
  constructor() {}

  runTheSearch(term:string) {
    this.list.search(term);
  }
}
