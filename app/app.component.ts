import {Component} from '@angular/core';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public firstName;
  public lastName;
  constructor() {
    this.firstName = 'Schalk';
    this.lastName = 'Burger';
  }
  fan() {}
}
