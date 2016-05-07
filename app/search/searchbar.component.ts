import {Component, Input, Output, EventEmitter} from '@angular/core';
import {HOVER_INPUT, FORM_STYLING} from '../styles/forms';
import {BUTTONS} from '../styles/buttons';


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
  ]
})
export class SearchBarComponent {
  @Input() term = '';
  @Output() termChange = new EventEmitter<string>();
  @Output('execute-search') execute = new EventEmitter<string>();

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
