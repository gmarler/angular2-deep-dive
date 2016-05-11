import {
    it,
    inject,
    async,
    describe,
    expect,
} from '@angular/core/testing';
import {provide} from '@angular/core';
import {Track} from './track.model';

describe('Track model Tests', () => {
    it('Creates a track object from a POJO', () => {
      let track = Track.fromJson({
        a:42
      });
      expect(track instanceof Track).toBeTruthy();
    });

    it('Should copy all properties over', () => {
      let track = Track.fromJson({
        trackName: 'anything',
        artworkUrl100:'something'
      });
      expect(track.trackName).toEqual('anything');
      expect(track.artworkUrl100).toEqual('something');
    });
});
