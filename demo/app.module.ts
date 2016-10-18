import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { Ng2HttpModule } from '../src/ng2-http-client.module';
import { DataService } from './dataservice.service';

@NgModule({
  imports: [
    BrowserModule,
    Ng2HttpModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    DataService
  ]
})
export class AppModule { }
