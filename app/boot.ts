
// This is how you import components in ES6
// Absolute paths like the one below looks into node_modules
import {bootstrap} from '@angular/platform-browser-dynamic';
import {PLATFORM_DIRECTIVES, provide, PLATFORM_PIPES} from '@angular/core';
// Relative paths look up from the current file
import {ItunesAppComponent} from './app.component';
import {AudioDirective} from './tracks/audio.directive';
import {CurrencySymbol} from './tracks/trackpage/currencysymbol.pipe';

bootstrap(ItunesAppComponent, [provide(PLATFORM_DIRECTIVES, {
  useValue: AudioDirective,
  multi: true
}), provide(PLATFORM_PIPES, {
  useValue: [CurrencySymbol],
  multi: true
})])
  .then(function() {
    console.log('Itunes Browser is ready to go');
  }, function(err) {
    console.error('Ouch, something went wrong', err);
  });
