import {Component, ElementRef} from '@angular/core';

/* Just a reminder of the old days of Angular 1: remember Dependency Injection where you would "request" services?
  angular.module('MyApp')
    .controller('HomePageController', ['ApiService', 'NameService', function(ApiService, NameService) {
    // Do something with those services
  }])
*/

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public firstName: string = 'Schalk';
  public lastName: string = 'Burger';
  constructor() {
    this.lastName = 'e 04';
  }

  fan() {
    return `Go ${this.firstName}${this.lastName}!!!`;
  }
}
