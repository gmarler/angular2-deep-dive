import {Component, Input, Output, EventEmitter, Inject, provide} from '@angular/core';
import {HOVER_INPUT, FORM_STYLING} from '../styles/forms';
import {BUTTONS} from '../styles/buttons';
import {USE_JSONP} from '../config';
import {Logger} from '../logger';

@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input [(ngModel)]="term" (keyup)="termHasChanged()" class="form-control" (keyup.enter)="executeSearch(term, $event)">
    <button class="btn btn-info" (click)="executeSearch(term, $event)">Search</button>
  `,
  styles: [
    HOVER_INPUT,
    FORM_STYLING,
    BUTTONS
  ],
  providers: [
    provide(Logger, {
      useFactory: (useJsonp) => {
        if(useJsonp) {
          return new Logger('SB', 'color: blue');
        }
        return new Logger('SearchBar', 'color: maroon; font-size: 25px');
      }
    })
  ]
})
export class SearchBarComponent {
  @Input() term = '';
  @Output() termChange = new EventEmitter<string>();
  @Output('execute-search') execute = new EventEmitter<string>();

  constructor(@Inject(USE_JSONP) useJsonp:boolean) {
  }

  termHasChanged() {
    this.termChange.emit(this.term);
  }

  executeSearch(term:string, event:MouseEvent) {
    if(event.shiftKey) {
      this.term = '';
    } else {
      this.execute.emit(term);
    }
  }
}
