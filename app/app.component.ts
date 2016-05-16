import {Component, ElementRef, provide, ViewChild, Inject, OnInit} from '@angular/core';
import {Track} from './tracks/track.model';
import {SearchService, API_URL} from './search/search.service';
import {SearchPageComponent} from './search/searchpage.component';
import {SettingsPageComponent} from './settings/settingspage.component';
import {TrackPageComponent} from './tracks/trackpage.component';
import {JSONP_PROVIDERS, URLSearchParams, RequestOptions, BaseRequestOptions} from '@angular/http';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html',
  providers: [
    JSONP_PROVIDERS
  ],
  template: `
  <header class="navbar">
    <div class="navbar-header navbar-brand">Angular2 Deep Dive</div>
    <ul class="nav navbar-nav">
      <li>
      </li>
      <li>
      </li>
    </ul>
  </header>
  <div class="container">
  </div>
  `,
  directives: []
})
export class ItunesAppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
}
