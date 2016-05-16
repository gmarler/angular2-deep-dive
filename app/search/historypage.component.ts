import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  template: `
    <ul>
      <li *ngFor="let term of terms">
        <a>{{term}}</a>
      </li>
    </ul>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class HistoryPageComponent implements OnInit {
  terms:string[] = [];
  constructor(private router:Router) {}
  ngOnInit() {
    this.terms = ['massive', 'portishead', 'morcheeba'];
  }
}
