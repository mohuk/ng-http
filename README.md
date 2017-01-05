# ng-http
Helper methods for Angular2 HTTP

# Usage

### Install `ng-http`
```bash
npm i ng-http -S
```

### Define configuration as `NgHttpConfig`
```typescript
import { NgHttpConfig } from 'ng-http';
import { Response, Request } from '@angular/http';

export const ngHttpConfig: NgHttpConfig = {
  baseUrl: 'http://api.geonames.org',
  afterHook: (res: Response) => {
    return res.json().geonames;
  },
  beforeHook: (req: Request) => {
    //just logging
    console.log(req);
    return req;
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
    NgHttpModule.forRoot(ngHttpConfig)
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

# API 
- init(baseUrl?: string): void // will soon be deprecated
- get(url: string, RequestOptionsArgs?): Observable<Response>
- put(url: string, body: string, options? :RequestOptionsArgs): Observable<Response>
- post(url: string, body: string, options? :RequestOptionsArgs): Observable<Response>
- delete(url: string, RequestOptionsArgs?): Observable<Response>
- patch(url: string, body: string, options? :RequestOptionsArgs): Observable<Response>
- addBeforeHook(func: BeforeHookFunction): void
- addAfterHook(func: AfterHookFunction): void

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
