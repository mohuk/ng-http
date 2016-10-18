import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from './ng2-http-client.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    HttpClient
  ]
})
export class Ng2HttpModule {}
