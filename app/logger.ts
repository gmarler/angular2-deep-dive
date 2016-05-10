import {Injectable, Optional, Inject} from '@angular/core';

@Injectable()
export class Logger {
  constructor(private prefix:string, private style:string) {
    this.style = style || 'font-size: 30px;';
  }
  log(message:string) {
    console.log(`%c${this.prefix} | ${message}`, this.style);
  }
}

@Injectable()
export class AlertLogger {
  log(message:string) {
    window.alert(message);
  }
}
