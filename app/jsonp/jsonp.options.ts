import {BaseRequestOptions, URLSearchParams} from '@angular/http';

export class JsonpOptions extends BaseRequestOptions {
  search = new URLSearchParams('callback=JSONP_CALLBACK');
}
