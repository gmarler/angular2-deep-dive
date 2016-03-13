import {Component, ElementRef} from '@angular/core';

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
