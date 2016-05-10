import {
  it,
  inject,
  async,
  describe,
  expect,
} from '@angular/core/testing';
import {provide} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Track} from './track.model';
import {TrackListComponent} from './track-list.component';
import {TrackComponent} from './track.component';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {SearchService} from '../search/search.service';

describe('Track rows', () => {
  it('Creates a track row per track', () => {
  });
});
