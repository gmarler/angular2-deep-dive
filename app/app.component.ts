import {Component, ElementRef} from '@angular/core';


@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public person: any;
  constructor() {
    this.person = {
      firstName: 'Poe',
      lastName: 'Dameron'
    };
  }

  fan() {
    return `BB8 belongs to ${this.person.firstName} ${this.person.lastName}`;
  }
}
