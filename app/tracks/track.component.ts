import {Component, Input, ViewEncapsulation, ElementRef, Directive, ContentChild, ViewChild} from '@angular/core';
import {GRID} from '../styles/grid/grid12';
import {COLORS} from '../styles/colors';
import {BUTTONS} from '../styles/buttons';
import {BOOTSTRAP_CORE} from '../styles/bootstrap';
import {Track} from '../tracks/data';

@Directive({
  selector: 'audio'
})
class AudioDirective {
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

@Directive({
  selector: 'audio'
})
class PreviewDirective {
  @ContentChild(AudioDirective) audioComponent: AudioDirective;
  play() {
    this.audioComponent.play();
  }
  stop() {
    this.audioComponent.stop();
  }
}


@Component({
  selector: 'cool-audio',
  directives: [AudioDirective, PreviewDirective],
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
class CoolAudio  {
  @ViewChild(AudioDirective) private ngAudioElement:AudioDirective;
  play() {
    console.log(`Now playing ${this.ngAudioElement.source}`);
    this.ngAudioElement.play();
  }
  stop() {
    this.ngAudioElement.stop();
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
        <source [src]="track.previewUrl" type="audio/mp4">
      </cool-audio>
    </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.Native
})
export class TrackComponent {
  @Input('track-model') track: Track;
}
