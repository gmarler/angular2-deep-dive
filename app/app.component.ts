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
  private lastName: string = 'Burger';
  constructor(private elRef: ElementRef) {
    this.lastName = 'e 04';
  }

  fan() {
    return `Go ${this.firstName}${this.lastName}!!! -- sent from ${this.elRef.nativeElement}`;
  }
}

let a = new ItunesAppComponent();

window.alert(a.lastName);
