import {Component} from '@angular/core';

@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input [(ngModel)]='searchTerm' class="form-control" (keyup.enter)="executeSearch(searchTerm, $event)">
    <button class="btn btn-info" (click)="executeSearch(searchTerm, $event)">Search</button>
  `
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
