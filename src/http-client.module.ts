import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from './http-client.service';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    HttpClient
  ]
})
export class NgHttpModule {}
