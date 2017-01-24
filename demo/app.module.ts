import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { DataService } from './dataservice.service';
import { NgHttpConfigDetail } from '../config/ngHttpConfig';
import { HttpClient } from '../src/http-client.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    HttpClient,
    DataService,
    {
      provide: 'ngHttpConfig',
      useClass: NgHttpConfigDetail
    }
  ]
})
export class AppModule { }
