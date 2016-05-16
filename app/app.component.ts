import {Component, ElementRef, provide, ViewChild, Inject, OnInit} from '@angular/core';
import {Track} from './tracks/track.model';
import {SearchService, API_URL} from './search/search.service';
import {SearchPageComponent} from './search/searchpage.component';
import {SettingsPageComponent} from './settings/settingspage.component';
import {TrackPageComponent} from './tracks/trackpage.component';
import {JSONP_PROVIDERS, URLSearchParams, RequestOptions, BaseRequestOptions} from '@angular/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  providers: [
    JSONP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
  ],
  template: `
  <header class="navbar">
    <div class="navbar-header navbar-brand">Angular2 Deep Dive</div>
    <ul class="nav navbar-nav">
      <li>
        <a routerLink="/search">Search</a>
      </li>
      <li>
        <a [routerLink]="['/settings']">Settings</a>
      </li>
    </ul>
  </header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/search', component: SearchPageComponent},
  {path: '/settings', component: SettingsPageComponent}
])
export class ItunesAppComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit() {
    this.router.navigateByUrl('/search');
  }
}
