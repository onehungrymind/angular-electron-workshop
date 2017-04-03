import { Component } from '@angular/core';

declare var electron: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}

  openAbout() {
    const { shell } = electron;
    shell.openExternal('http://onehungrymind.com/');
  }

}
