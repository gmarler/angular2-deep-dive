import {Component} from '@angular/core';

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public firstName: string = 'Schalk';
  public lastName: any = 'Burger';
  constructor() {
    // Anything goes
    this.lastName = 2;
    this.lastName = false;
    this.lastName = [];
    this.lastName = {};
  }
  fan() {}
}
