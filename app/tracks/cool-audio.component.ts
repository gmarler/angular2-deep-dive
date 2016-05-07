import {Component, ViewChild} from '@angular/core';
import {AudioDirective} from './audio.directive';
import {BUTTONS} from '../styles/buttons';

@Component({
  selector: 'cool-audio',
  directives: [AudioDirective],
  styles: [BUTTONS],
  template: `
  <div>
    <button class="btn btn-info" (click)="play()">Play</button>
    <button class="btn btn-danger" (click)="stop()">Stop</button>
    <audio>
      <ng-content select="source"></ng-content>
    </audio>
  </div>
  `
})
export class CoolAudio  {
  @ViewChild(AudioDirective) private ngAudioElement:AudioDirective;
  play() {
    this.ngAudioElement.play();
  }
  stop() {
    this.ngAudioElement.stop();
  }
}
