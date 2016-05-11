import {
  it,
  inject,
  injectAsync,
  describe,
  expect,
  beforeEachProviders,
  beforeEach,
} from '@angular/core/testing';
import {
  provide
} from '@angular/core';
import {
  MockBackend
} from '@angular/http/testing';
import {JSONPBackend, JSONP_PROVIDERS, Response, ResponseOptions, RequestOptions} from '@angular/http';
import { SearchService } from './search.service';
import {JsonpOptions} from '../jsonp/jsonp.options';

describe('SearchService Tests', () => {
  beforeEachProviders(() => [
    JSONP_PROVIDERS,
    provide(JSONPBackend, {useClass:MockBackend}),
    provide(RequestOptions, {useClass: JsonpOptions}),
    SearchService
  ]);

  describe('Without settings', () => {
    it('Should have the default URL value if not provided', inject([SearchService], (searchService:SearchService) => {
      expect(searchService.url).toBe('https://itunes.apple.com/search');
    }));
  });

  describe('With settings', () => {
    beforeEachProviders(() => [
      provide('CONFIGURABLE_API_URL', {
          useValue: 'some other value'
      })
    ]);
    it('Should have the new  URL value if provided', inject([SearchService], (searchService:SearchService) => {
      expect(searchService.url).toBe('some other value');
    }));
  });

  it('Should read the data from the results array of response data', injectAsync([JSONPBackend, SearchService], (backend:MockBackend, searchService:SearchService) => {
    backend.connections.subscribe(c => {
      c.mockRespond(new Response(new ResponseOptions({
        body: {
          results: [{},{},{}],
        },
        status: 200,
        url: 'm'
      })));
      expect(c.request.url).toContain('yellow');
    });
    searchService.search('yellow').then((items) => {
      expect(items.length).toEqual(3);
    });
  }));
});
