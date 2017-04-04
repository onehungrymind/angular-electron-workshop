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
    this.startCamera();
  }

  startCamera() {
    // use the navigator.mediaDevices to get the user media
    // and assign the stream to this.cameraStream
  }

  takePicture() {
    // Use canvas in the template and get the 2d context

    // draw the image using the video element

    // pop up a notification that the image has been taken
  }

  clearPicture() {
    this.photo = null;
  }

  copyPicture() {
    const { clipboard } = electron;
    const { dialog, app } = electron.remote;
    
    // Create a native image and use the clipboard
    // to write the image as a .jpg
    
    // Use the dialog module to show a message saying
    // the image has been copied
    // Optional: use a custom icon
    // (there's a thumbs-up emoji in the assets folder)
  }

  private createNativeImage(image) {
    const { nativeImage } = electron;
    return nativeImage.createFromDataURL(image);
  }

}