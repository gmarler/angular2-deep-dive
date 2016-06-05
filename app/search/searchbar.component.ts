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
export class SearchBarComponent implements AfterViewInit, OnDestroy {
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
    let clicks = Observable.fromEvent<MouseEvent>(this.searchButton.nativeElement, 'click');
    let strokes = Observable.fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup');
    clicks = clicks.filter(event => !event.altKey && !event.shiftKey && !event.ctrlKey && event.button === 0 );
    let [enterStrokes, letterStrokes] = [strokes.filter(event => event.keyCode === 13), strokes.filter(event => !event.altKey && !event.ctrlKey && event.keyCode >= 32)];
    letterStrokes = letterStrokes.debounceTime(300);
    let clicksString = clicks.map(event => this.searchInput.nativeElement.value as string);
    let enterStrokesString = enterStrokes.map(event => this.searchInput.nativeElement.value as string);
    let letterStrokesString = letterStrokes.map(event => this.searchInput.nativeElement.value as string);
    let searchRequests = Observable.merge(clicksString, enterStrokesString, letterStrokesString)
      .distinctUntilChanged()
      .switchMap(searchValue => this.searchService.search(searchValue));
    this.subscription = searchRequests.subscribe(tracks => this.complete.emit(tracks));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
