import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {HistoryService} from './history.service';

@Component({
  template: `
    <ul>
      <li *ngFor="let term of terms">
        <a [routerLink]="['/search', {term:term}]">{{term}}</a>
      </li>
    </ul>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class HistoryPageComponent implements OnInit {
  terms:string[];
  constructor(private router:Router, private historyService:HistoryService) {}
  ngOnInit() {
    this.terms = this.historyService.searches;
  }
}
