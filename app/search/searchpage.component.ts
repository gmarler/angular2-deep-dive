import {Component, Input, ViewChild, AfterViewInit, OnChanges, Pipe, PipeTransform} from '@angular/core';
import {SearchBarComponent} from './searchbar.component';
import {HistoryService} from './history.service';
import {TrackListComponent} from '../tracks/track-list.component';
import {Router, RouteSegment, OnActivate, CanDeactivate, RouteTree} from '@angular/router';

@Pipe({name:'add'})
export class AddPipe {
  transform(initial:number, ...args:number[]):number {
    args.forEach(n => {
      initial += n;
    });
    return initial;
  }
}

@Component({
  template: `
    {{4 | add:5:10:20:3}}
    <search-bar [(term)]="typedTerm" class="form-group" (execute-search)="runTheSearch($event)"></search-bar>
    <track-list></track-list>`,
  pipes: [AddPipe],
  directives: [SearchBarComponent, TrackListComponent]
})
export class SearchPageComponent implements OnActivate {
  typedTerm:string;
  @ViewChild(TrackListComponent) list:TrackListComponent;
  constructor(private historyService:HistoryService) {}

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
