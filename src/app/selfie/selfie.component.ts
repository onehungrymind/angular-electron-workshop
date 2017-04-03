import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  nativeImage;

  constructor(public el: ElementRef, public http: Http) {}

  ngOnInit() {
    const { ipcRenderer } = electron;

    ipcRenderer.on('copy-image', (event, arg) => {
      console.log(event);
      console.log(arg);
      if (this.photo) {
        this.copyPicture();
      }
    });

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
    const { clipboard } = electron;
    const { dialog, app } = electron.remote;
    let image = this.createNativeImage(this.photo);
    clipboard.writeImage(image, 'jpg');
    let icon = `${app.getAppPath()}/assets/thumbsup.png`;
    dialog.showMessageBox({ message: 'Picture Copied!', detail: 'Your picture has been copied!', icon });
  }

  savePicture() {
    const { ipcRenderer, nativeImage } = electron;
    let image = this.createNativeImage(this.photo);
    ipcRenderer.send('save-file', image.toJPEG(50));
  }

  private createNativeImage(image) {
    const { nativeImage } = electron;
    return nativeImage.createFromDataURL(image);
  }

}