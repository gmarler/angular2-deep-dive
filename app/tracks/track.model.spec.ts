import {
  it,
  describe,
  expect,
} from '@angular/core/testing';
import {Track} from './track.model';

describe('Track model Tests', () => {
  it('Creates a track object from a POJO', () => {
    let track = Track.fromJson({
      a: 41
    });
    expect(track instanceof Track).toBeTruthy();
  });

  it('Should copy all properties over', () => {
    let track = Track.fromJson({
      trackName: 'Hello',
      artistName: 'Hi'
    });
    expect(track.trackName).toEqual('Hello');
    expect(track.artistName).toEqual('Hi');
  });
});
