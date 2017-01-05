import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { NgHttpModule } from '../src/http-client.module';
import { DataService } from './dataservice.service';
import { ngHttpConfig } from './http.config';

@NgModule({
  imports: [
    BrowserModule,
    NgHttpModule.forRoot(ngHttpConfig)
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
