import {Component} from '@angular/core';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public firstName = 'Schalk';
  public lastName = 'Burger';
  constructor() {
    this.lastName = 2;
  }
  fan() {}
}
