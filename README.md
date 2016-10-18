# ng2-http-client
Helper methods for Angular2 HTTP

# Usage

### Install `ng2-http-client`
```bash
npm i ng2-http-client -S
```

### Import `Ng2HttpModule` in root `NgModule`

```typescript
...
import { NgModule } from '@angular/core';
import { Ng2HttpModule } from 'ng2-http-client';
...

@NgModule({
  ...
  imports: [Ng2HttpModule]
  ...
})
```

### Inject `HttpClient` in your service/component for usage
```typescript
...
import { Component } from '@angular/core';
import { HttpClient } from 'ng2-http-client';
...

@Component({
  ...
})
export class FooComponent {
  constructor(
    private httpClient: HttpClient
  ){
    httpClient.init('/api');
    httpClient.addBeforeHook((req: Request) => {
      this.httpClient.addBeforeHook((req: Request) => {
        let headers = new Headers();
        headers.append('Authorization', `Bearer: Hello123456`);
        req.headers = headers;
      });
    })
  }
}
```

# API 
- init(baseUrl?: string): void
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
