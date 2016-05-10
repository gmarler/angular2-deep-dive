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
  describe('Without settings', () => {
    it('Should have the default URL value if not provided', inject([SearchService], (searchService:SearchService) => {
    }));
  });

  describe('With settings', () => {
    it('Should have the new  URL value if provided', inject([SearchService], (searchService:SearchService) => {
    }));
  });

  it('Should read the data from the results array of response data', injectAsync([JSONPBackend, SearchService], (backend:MockBackend, searchService:SearchService) => {
  }));
});
