import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SelfieComponent } from './selfie/selfie.component';
import { ScreencapComponent } from './screencap/screencap.component';
import { ScreencapService } from './screencap/screencap.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    SelfieComponent,
    ScreencapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [ScreencapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
