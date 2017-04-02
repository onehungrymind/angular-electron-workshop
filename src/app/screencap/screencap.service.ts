import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer } from 'rxjs';

declare var electron: any;

@Injectable()
export class ScreencapService {

  private streamObserver: Observer<string>;
  public streamChange$: Observable<string> = new Observable(obs => this.streamObserver = obs);

  constructor(public sanitizer: DomSanitizer) { }

  getStream() {
    const { desktopCapturer } = electron;
    return new Observable(obs => {
      desktopCapturer.getSources({ types: ['window'] }, (error, sources) => {
        const appWindow = sources.find(source => source.name === document.title);
        if (error) {
          obs.error(error);
        }
        (<any>window).navigator.webkitGetUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: appWindow.id,
              minWidth: 1280,
              maxWidth: 4000,
              minHeight: 720,
              maxHeight: 4000
            }
          }
        }, (stream: MediaStream) => obs.next(stream), error => obs.error(error));
      });
    });
  }

  getVideo(stream: MediaStream) {
    return new Observable(obs => {
      const videoUrl = URL.createObjectURL(stream);
      obs.next({
        videoUrl: this.sanitizer.bypassSecurityTrustUrl(videoUrl),
        stream
      });
    });
  }

}
