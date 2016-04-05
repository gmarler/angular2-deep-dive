import {Component} from '@angular/core';

@Component({
  selector: 'search-bar',
  template: `
    <label>Search for</label>
    <input #inputElement class="form-control" (keyup.enter)="executeSearch(inputElement.value, $event)">
    <button class="btn btn-info" (click)="executeSearch(inputElement.value, $event)">Search</button>
  `
})
export class SearchBarComponent {}
