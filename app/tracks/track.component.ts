import {Component, Input, ViewEncapsulation, ElementRef, ViewChild, ContentChild} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {COLORS} from '../styles/colors';
import {BUTTONS} from '../styles/buttons';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from '../tracks/data';


@Component({
  selector: 'cool-audio',
  styles: [BUTTONS],
  template: `
  <div>
    <button class="btn btn-info" (click)="play()">Play</button>
    <button class="btn btn-danger" (click)="stop()">Stop</button>
    <audio #audioElement>
      <ng-content select="source"></ng-content>
    </audio>
  </div>
  `
})
class CoolAudio  {
  @ViewChild('audioElement') private ngAudioElement:ElementRef;
  @ContentChild('sourceElement') private ngSourceElement:ElementRef;
  private audioElement:any;
  play() {
    console.log(`Now playing ${this.ngSourceElement.nativeElement.getAttribute('src')}`);
    this.audioElement.play();
  }
  stop() {
    this.audioElement.pause();
  }
  ngAfterViewInit() {
    this.audioElement = this.ngAudioElement.nativeElement;
  }
}

@Component({
  selector: 'track-row',
  directives: [CoolAudio],
  styles: [
    BOOTSTRAP_CORE,
    GRID,
    `
    .row {
      margin-top: 5px;
      margin-bottom: 5px;
      border-bottom: dotted 1px ${COLORS.quinary};
    }
    .track {
      font-size: 120%;
      margin-bottom: 0;
    }

    .album {
      line-height: 16px;
    }
    `
  ],
  template: `
  <div class="row">
    <div class="col-xs-3">
      <img [src]="track.artworkUrl100">
    </div>
    <div class="col-xs-8">
      <p class="track" [innerText]="track.trackName"></p>
      <p class="album" [innerHtml]="'<i>'+track.collectionName+'</i>'"></p>
    </div>
    <div class="col-xs-12">
      <cool-audio>
        <source #sourceElement [src]="track.previewUrl" type="audio/mp4">
      </cool-audio>
    </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.Native
})
export class TrackComponent {
  @Input('track-model') track: Track;
}
