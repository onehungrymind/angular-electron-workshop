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
    context.drawImage(this.camera.nativeElement, 0, 0, 300, 200);
    this.photo = this.canvas.nativeElement.toDataURL('image/png');
    this.canvas.nativeElement.style = 'hidden';
  }

  clearPicture() {
    this.photo = null;
  }

  copyPicture() {
    const { clipboard, nativeImage } = electron;
    const { dialog, app } = electron.remote;
    let image = nativeImage.createFromDataURL(this.photo);
    clipboard.writeImage(image, 'jpg');
    let icon = `${app.getAppPath()}/assets/thumbsup.png`;
    dialog.showMessageBox({ message: 'Picture Copied!', detail: 'Your picture has been copied!', icon });
  }

}