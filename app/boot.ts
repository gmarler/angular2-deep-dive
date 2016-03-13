
// This is how you import components in ES6
// Absolute paths like the one below looks into node_modules
import {bootstrap} from '@angular/platform-browser-dynamic';
// Relative paths look up from the current file
import {ItunesAppComponent} from './app.component';


/* Some references regarding Typescript
Google Trends:
http://www.google.com/trends/explore#cat=0-5-31&q=coffeescript%2C%20typescript%2C%20dart%2C%20elm%2C%20purescript&date=today%2012-m&cmpt=q&tz=Etc%2FGMT-8

Blog post about Microsoft's TypeScript team working with the Angular team
https://blogs.msdn.microsoft.com/typescript/2015/03/05/angular-2-built-on-typescript/

Default Angular quickstart
https://angular.io/docs/ts/latest/quickstart.html


Javascript Angular quickstart shows a box hinting that you should probably go TS
https://angular.io/docs/js/latest/quickstart.html
*/

// Lots to learn about promises,
// I have published a 2 hours course about it :)
// https://www.packtpub.com/web-development/learning-javascript-promises-practical-applications-es6-and-angularjs-video
bootstrap(ItunesAppComponent, [])
  .then(function() {
    console.log('Itunes Browser is ready to go');
  }, function(err) {
    console.error('Ouch, something went wrong', err);
  });
