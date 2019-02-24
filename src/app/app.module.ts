import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { KrakenService } from './services/kraken.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    KrakenService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
