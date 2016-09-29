import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { Ng2HttpClient } from '../src/ng2-http-client.module';

@NgModule({
  imports: [
    BrowserModule,
    Ng2HttpClient
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
