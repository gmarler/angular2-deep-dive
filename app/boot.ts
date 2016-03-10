// This is how you import components in ES6
// Absolute paths like the one below looks into node_modules
import {bootstrap} from '@angular/platform-browser-dynamic';
// Relative paths look up from the current file
import {ItunesAppComponent} from './app.component';

// Once we've created our component, we'll boostrap the application
bootstrap(ItunesAppComponent, []);
