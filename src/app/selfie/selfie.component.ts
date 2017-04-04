import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(public http: Http) {}

  ngOnInit() {
    const { ipcRenderer, remote } = electron;
    const { Menu, MenuItem } = remote;

    // use ipcRenderer to listen for a message
    // from the main process to indicate an 
    // accelerator (quick key) has been used.
    // Copy the picture when the message is received.

    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
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
    let notification = new Notification('Wow!', {
      body: 'You look great today!'
    });
  }

  clearPicture() {
    this.photo = null;
  }

  copyPicture() {
    const { clipboard } = electron;
    const { dialog, app } = electron.remote;
    if (!this.photo) return;
    let image = this.createNativeImage(this.photo);
    clipboard.writeImage(image, 'jpg');
    let icon = `${app.getAppPath()}/assets/thumbsup.png`;
    dialog.showMessageBox({ message: 'Picture Copied!', detail: 'Your picture has been copied!', icon });
  }

  savePicture() {
    const { ipcRenderer, nativeImage } = electron;

    // Create native image out of the selfie
    // and send a message to the main process
    // using ipcRenderer. The message needs to include
    // the image itself
  }

  private createNativeImage(image) {
    const { nativeImage } = electron;
    return nativeImage.createFromDataURL(image);
  }

}