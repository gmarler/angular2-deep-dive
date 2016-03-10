
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
bootstrap(ItunesAppComponent, []);
bootstrap(MatSays, []);
