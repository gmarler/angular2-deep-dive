import {Component, ElementRef} from '@angular/core';

interface Person {
  firstName: string;
  lastName: string;
  age?: number;
}

@Component({
  selector: 'itunes-browser',
  templateUrl: 'app/app.html'
})
export class ItunesAppComponent {
  public person: Person;
  constructor() {
    this.person = {
      firstName: 'Poe',
      lastName: 'Dameron',
      age: 24
    };
  }

  fan() {
    return `BB8 belongs to ${this.person.firstName} ${this.person.lastName}`;
  }
}
