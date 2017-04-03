import { Component, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer, desktopCapturer } from 'electron';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ScreencapService } from './screencap.service';

declare var electron: any;

@Component({
  selector: 'app-screencap',
  templateUrl: './screencap.component.html',
  styleUrls: ['./screencap.component.css']
})
export class ScreencapComponent implements OnInit {

  @ViewChild('video') video;
  @ViewChild('canvas') canvas;
  videoSrc: SafeUrl = '';
  stream: MediaStream;
  capturedImage: string;
  loading = false;

  constructor(private screencap: ScreencapService) { }

  ngOnInit() {
  }

  captureScreen() {
    this.loading = true;
    this.screencap
      .getStream()
      .flatMap((stream: MediaStream) => this.screencap.getVideo(stream))
      .subscribe(
        (data: any) => {
          this.videoSrc = data.videoUrl;
          this.video.nativeElement.onloadedmetadata = () => {
            const context = this.canvas.nativeElement.getContext('2d');
            context.drawImage(this.video.nativeElement, 0, 0, 1280, 720);
            this.capturedImage = this.canvas.nativeElement.toDataURL('image/png');
            this.loading = false;
            data.stream.getTracks()[0].stop();
          }
        },
        (error: any) => console.log(error)
      );
  }

}
