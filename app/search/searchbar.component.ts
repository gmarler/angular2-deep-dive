import {Component, ViewEncapsulation} from '@angular/core';
import {HOVER_INPUT} from '../styles/forms';

@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input [(ngModel)]='searchTerm' class="form-control" (keyup.enter)="executeSearch(searchTerm, $event)">
    <button class="btn btn-info" (click)="executeSearch(searchTerm, $event)">Search</button>
  `,
  styles: [
    HOVER_INPUT
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
