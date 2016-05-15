import {Component, ViewChild} from '@angular/core';
import {SearchBarComponent} from './searchbar.component';
import {TrackListComponent} from '../tracks/track-list.component';
import {Router} from '@angular/router';

@Component({
  template: `
    <search-bar [(term)]="typedTerm" class="form-group" (execute-search)="runTheSearch($event)"></search-bar>
    <h3 [hidden]="!searchTerm">Tracks containing "<span [innerText]="searchTerm"></span>"</h3>
    <track-list></track-list>`,
  directives: [SearchBarComponent, TrackListComponent]
})
export class SearchPageComponent {
  @ViewChild(TrackListComponent) list:TrackListComponent;
  constructor(private router:Router) {}
  runTheSearch(term:string) {
    this.list.search(term);
  }
}
