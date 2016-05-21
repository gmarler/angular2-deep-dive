import {Pipe, PipeTransform, Component, Input, ViewChild, AfterViewInit, OnChanges, ChangeDetectorRef, EventEmitter} from '@angular/core';
import {SearchBarComponent} from './searchbar.component';
import {HistoryService} from './history.service';
import {TrackListComponent} from '../tracks/track-list.component';
import {Router, RouteSegment, OnActivate, CanDeactivate, RouteTree} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {AsyncPipe} from '@angular/common';

@Pipe({
  name: 'async'
})
class MyAsyncPipe extends AsyncPipe {
  constructor(_ref: ChangeDetectorRef) {
    console.log('Async pipe created');
    super(_ref);
  }
  transform(obj: Subject<string[]>):any {
    if(!this._subscription) {
      console.log('subscribing once');
      obj.subscribe((arr) => {
        console.log('Check', arr);
      });
    }
    return super.transform(obj);
  }
}

@Component({
  pipes: [MyAsyncPipe],
  template: `
    <div>
      Recent searches:
      <ul id="history">
        <li *ngFor="let h of (history | async)" (click)="runTheSearch(h)">{{h}}</li>
      </ul>
    </div>
    <search-bar [(term)]="typedTerm" class="form-group" (execute-search)="runTheSearch($event)"></search-bar>
    <track-list></track-list>
    `,
  styles: [
    `#history li {
      display: inline-block;
      padding: 0 10px;
    }`
  ],
  directives: [SearchBarComponent, TrackListComponent]
})
export class SearchPageComponent implements OnActivate {
  typedTerm:string;
  history:Subject<string[]>;
  @ViewChild(TrackListComponent) list:TrackListComponent;
  constructor(private historyService:HistoryService) {
  }

  ngOnInit() {
    this.history = this.historyService.searchesO;
  }

  routerOnActivate(segment:RouteSegment) {
    this.typedTerm = segment.getParam('term') || '';
  }

  clearTerm() {
    this.typedTerm = '';
  }

  runTheSearch(term:string) {
    this.historyService.add(term);
    this.list.search(term).then(() => this.clearTerm());
  }
}
