import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var electron: any;

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.css']
})
export class SelfieComponent implements OnInit {

  cameraStream;
  photo: string;
  imageCopied = false;
  @ViewChild('canvas') canvas;
  @ViewChild('camera') camera;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
      this.cameraStream = stream;
    }).catch(err => {
      console.log(err);
    });
  }

  takePicture() {
    let context = this.canvas.nativeElement.getContext('2d');
    this.canvas.width = 250;
    this.canvas.height = 250;
    context.drawImage(this.camera.nativeElement, 0, 0, 250, 250);

    this.photo = this.canvas.nativeElement.toDataURL('image/png');
    this.canvas.nativeElement.style = 'hidden';
  }

  clearPicture() {
    this.photo = null;
    this.imageCopied = false;
  }

  copyPicture() {
    const { clipboard, nativeImage } = electron;
    let image = nativeImage.createFromDataURL(this.photo);
    clipboard.writeImage(image, 'jpg');
    this.imageCopied = true;
  }

}