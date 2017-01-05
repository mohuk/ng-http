import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient } from './http-client.service';
import { NgHttpConfig } from './http-client.config';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    HttpClient
  ]
})
export class NgHttpModule {
  static forRoot(ngHttpConfig: NgHttpConfig): ModuleWithProviders {
    return {
      ngModule: NgHttpModule,
      providers: [
        {
          provide: 'ngHttpConfig',
          useValue: ngHttpConfig
        }
      ]
    }
  }
}
