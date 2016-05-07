
// This is how you import components in ES6
// Absolute paths like the one below looks into node_modules
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
// Relative paths look up from the current file
import {ItunesAppComponent} from './app.component';

bootstrap(ItunesAppComponent, [HTTP_PROVIDERS])
  .then(function() {
    console.log('Itunes Browser is ready to go');
  }, function(err) {
    console.error('Ouch, something went wrong', err);
  });
