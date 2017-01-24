# ng-http
Helper methods for Angular2 HTTP

# Usage

### Install `ng-http`
```bash
npm i ng-http -S
```

### Define configuration as `NgHttpConfig`
```typescript
import { NgHttpConfig, AfterHookFunction, BeforeHookFunction } from 'ng-http';
import { Response, Request } from '@angular/http';

export class NgHttpConfigDetail implements NgHttpConfig  {
  baseUrl: string;
  afterHook: AfterHookFunction;
  errorHook: AfterHookFunction;
  beforeHook: BeforeHookFunction;

  constructor() {
    this.baseUrl = 'http://api.geonames.org';
    this.afterHook = (res: Response) => {
      return res.json().geonames;
    };
    this.beforeHook = (req: Request) => {
      //just logging
      console.log(req);
      return req;
    }
    this.errorHook = (req: Request) => {
      return console.log('Error Occurred')
    };
  }
}

```

### Import `NgHttpModule` in root `NgModule`

```typescript
...
import { NgModule } from '@angular/core';
import { NgHttpModule } from 'ng-http';
import { ngHttpConfig } from './http.config';
...

@NgModule({
  ...
  imports: [
    NgHttpModule
  ],
  ...
  providers: [
      {
        provide: 'ngHttpConfig',
        useClass: NgHttpConfigDetail
      }
    ]
  ...
})
```

### Inject `HttpClient` in your service/component for usage
```typescript
...
import { Component } from '@angular/core';
import { HttpClient } from 'ng-http';
...

@Component({
  ...
})
export class FooComponent {
  constructor(
    private httpClient: HttpClient
  ){}
}
```

# Config Interface
- baseUrl: string
- beforeHook: BeforeHookFunction
- afterHook: AfterHookFunction
- errorHook: AfterHookFunction

# API 
- get(url: string, RequestOptionsArgs?): Observable<Response>
- put(url: string, body: string, options? :RequestOptionsArgs): Observable<Response>
- post(url: string, body: string, options? :RequestOptionsArgs): Observable<Response>
- delete(url: string, RequestOptionsArgs?): Observable<Response>
- patch(url: string, body: string, options? :RequestOptionsArgs): Observable<Response>

# Setup development Environment

### Install Peer Dependencies
```bash
$ npm i @angular/core @angular/http
$ npm i rxjs zone.js reflect-metadata core-js
```

### Install Dev Dependencies
```bash
$ npm i
```

### Popup development Environment
```bash
npm run start
```
