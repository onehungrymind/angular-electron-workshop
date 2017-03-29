import { Component, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer, desktopCapturer } from 'electron';
import { DomSanitizer } from '@angular/platform-browser';

declare var electron: any;

@Component({
  selector: 'app-screencap',
  templateUrl: './screencap.component.html',
  styleUrls: ['./screencap.component.css']
})
export class ScreencapComponent implements OnInit {

  @ViewChild('video') video;
  @ViewChild('canvas') canvas;

  screencap: string;
  videoSrc: any;
  stream: any;
  loading = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  captureScreen() {
    const { desktopCapturer } = electron;
    this.loading = true;
    desktopCapturer.getSources(
      { types: ['window', 'screen'] },
      (error, sources) => {
        if (error) throw error;
        sources.forEach(source => {
          if (source.name === (<any>window).document.title) {
            (<any>window).navigator.webkitGetUserMedia(
              {
                audio: false,
                video: {
                  mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: source.id,
                    minWidth: 1280,
                    maxWidth: 4000,
                    minHeight: 720,
                    maxHeight: 4000
                  }
                }
              },
              stream => {
                const videoUrl = URL.createObjectURL(stream);
                this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(videoUrl);
                this.loading = false;
                // try {
                //   stream.getTracks()[0].stop();
                // } catch (err) {
                //   console.log(err);
                // }
              },
              error => {
                console.log(error);
              }
            );
            return;
          }
        });
      }
    );
  }

  onLoadedMetadata() {
    let context = this.canvas.nativeElement.getContext('2d');
    // Draw video on canvas
    context.drawImage(this.video.nativeElement, 0, 0);
    this.screencap = this.canvas.nativeElement.toDataURL('image/png');
    this.video.nativeElement.remove();
  }

}
