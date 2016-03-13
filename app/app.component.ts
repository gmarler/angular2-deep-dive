import {Component} from '@angular/core';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public firstName: string = 'Schalk';
  public lastName: string|number = 'Burger';
  constructor() {
    this.lastName = 2;
  }
  fan() {}
}
