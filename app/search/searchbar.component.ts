import {Component, ViewEncapsulation, EventEmitter} from '@angular/core';
import {HOVER_INPUT, FORM_STYLING} from '../styles/forms';
import {BUTTONS} from '../styles/buttons';


@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input [(ngModel)]="searchTerm" (keyup)="termHasChanged()" class="form-control" (keyup.enter)="executeSearch(searchTerm, $event)">
    <button class="btn btn-info" (click)="executeSearch(searchTerm, $event)">Search</button>
  `,
  styles: [
    HOVER_INPUT,
    FORM_STYLING,
    BUTTONS
  ],
  encapsulation: ViewEncapsulation.Native,
  inputs: ['searchTerm: term'],
  outputs: ['sTC: termChange', 'execute: execute-search'],
})
export class SearchBarComponent {
  searchTerm = '';
  sTC = new EventEmitter<string>();
  execute = new EventEmitter();

  termHasChanged() {
    this.sTC.emit(this.searchTerm);
  }

  executeSearch(term:string, event:MouseEvent) {
    if(event.shiftKey) {
      this.searchTerm = '';
    } else {
      this.execute.emit(term);
    }
  }
}
