import {Component, ViewEncapsulation} from '@angular/core';
import {HOVER_INPUT, FORM_STYLING} from '../styles/forms';
import {BUTTONS} from '../styles/buttons';

@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input [(ngModel)]='searchTerm' class="form-control" (keyup.enter)="executeSearch(searchTerm, $event)">
    <button class="btn btn-info" (click)="executeSearch(searchTerm, $event)">Search</button>
  `,
  styles: [
    HOVER_INPUT,
    FORM_STYLING,
    BUTTONS
  ],
  encapsulation: ViewEncapsulation.Native
})
export class SearchBarComponent {
  public searchTerm = '';
  executeSearch(term:string, event:MouseEvent) {
    console.log(term);
    if(event.shiftKey) {
      this.searchTerm = '';
    }
  }
}
