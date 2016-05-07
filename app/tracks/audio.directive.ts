import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'audio'
})
export class AudioDirective {
  private native:any;
  constructor(el:ElementRef) {
    this.native = el.nativeElement;
  }
  play() {
    this.native.play();
  }
  stop() {
    this.native.pause();
  }
  get source() {
    return this.native.querySelector('source').getAttribute('src');
  }
}
