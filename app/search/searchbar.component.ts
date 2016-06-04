import {Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import {HOVER_INPUT, FORM_STYLING} from '../styles/forms';
import {BUTTONS} from '../styles/buttons';
import {Observable, Subscription} from 'rxjs/Rx';
import {SearchService} from './search.service';
import {Track} from '../tracks/track.model';

@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input [(ngModel)]="term" #searchInput class="form-control">
    <button class="btn btn-info" #searchButton>Search</button>
  `,
  styles: [
    HOVER_INPUT,
    FORM_STYLING,
    BUTTONS
  ]
})
export class SearchBarComponent implements AfterViewInit {
  @Input() term = '';
  @Output() termChange = new EventEmitter<string>();
  @Output('search-complete') complete = new EventEmitter<Track[]>();
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('searchButton') searchButton: ElementRef;
  subscription:Subscription;

  constructor(private searchService:SearchService) {}

  termTyping() {
    this.termChange.emit(this.term);
  }

  ngAfterViewInit() {

  }
}
