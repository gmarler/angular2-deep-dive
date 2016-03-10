
// This is how you import components in ES6
// Absolute paths like the one below looks into node_modules
import {bootstrap} from '@angular/platform-browser-dynamic';
// Relative paths look up from the current file
import {ItunesAppComponent} from './app.component';
import {Component} from '@angular/core';

// Don't create components inside this file, and use better naming for the class, this is just q&d demo
@Component({
  selector: 'inspiring-quote',
  template: `<h4>Quote:</h4>
  <p>Just remember, baby, you're the best!</p>
  `
}) class MatSays {}

// Once we've created our component, we'll boostrap the application
// Lots to learn about promises,
// I have published a 2 hours course about it :)
// https://www.packtpub.com/web-development/learning-javascript-promises-practical-applications-es6-and-angularjs-video
bootstrap(ItunesAppComponent, [])
  .then(function() {
    console.log('Itunes Browser is ready to go');
  }, function(err) {
    console.error('Ouch, something went wrong', err);
  });
bootstrap(MatSays, []).then(function() {
  console.log('Quotes app is ready to go');
}, function(err) {
  console.error('That s not inspiring...', err);
});
