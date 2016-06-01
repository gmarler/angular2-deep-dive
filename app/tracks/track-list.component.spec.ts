import {
  it,
  inject,
  async,
  describe,
  expect,
} from '@angular/core/testing';
import {provide} from '@angular/core';
import {Track} from './track.model';
import {TrackListComponent} from './track-list.component';
import {TrackComponent} from './track.component';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';
import {SearchService} from '../search/search.service';

describe('Track rows', () => {
  it('Creates a track row per track', async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb.overrideProviders(TrackListComponent, [provide(SearchService, {
      useValue: {
        search: (term) => {
          return Promise.resolve([
            Track.fromJson({
              trackName: 'Hi'
            }),
            Track.fromJson({
              trackName: 'Hi there'
            })
          ]);
        }
      }
    })])
    .createAsync(TrackListComponent)
    .then((componentFixture:ComponentFixture<TrackListComponent>) => {
      componentFixture.detectChanges();
      let component = componentFixture.componentRef.instance;
      component.trackComponents.changes.subscribe((rows) => {
        expect(rows.length).toBe(2);
      });
      component.search('hi').then(() => {
        componentFixture.detectChanges();
      });

    });
  })));
});
