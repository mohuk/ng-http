import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BeforeHookFunction, AfterHookFunction } from './ng2-http-client.types';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response, Request, RequestMethod } from '@angular/http';

@Injectable()
export class HttpClient {
    private baseUrl: string;
    private beforeHooks: Array<BeforeHookFunction>;
    private afterHooks: Array<AfterHookFunction>;
    constructor(
      private http: Http
    ) {
      this.beforeHooks = [];
      this.afterHooks = [];
    }

    init(baseUrl?: string): void {
      this.baseUrl = baseUrl;
    }
    get(url:string, options?: RequestOptionsArgs): Observable<Response> {
        let opts: RequestOptionsArgs = this.build(RequestMethod.Get, url, options);
        return this.request(url, opts);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let opts: RequestOptionsArgs = this.build(RequestMethod.Put, url, options, body);
        return this.request(url, opts);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let opts: RequestOptionsArgs = this.build(RequestMethod.Post, url, options, body);
        return this.request(url, opts);
    }

    delete(url:string, options?: RequestOptionsArgs): Observable<Response> {
        let opts: RequestOptionsArgs = this.build(RequestMethod.Delete, url, options);
        return this.request(url, opts);
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let opts: RequestOptionsArgs = this.build(RequestMethod.Patch, url, options, body);
        return this.request(url, opts);
    }

    private request(url: string | Request, options?: RequestOptionsArgs ): Observable<Response> {
      let req: Request;
      if(typeof url === 'string'){
        let reqOpt = new RequestOptions(options);
        reqOpt.url = url;
        req = new Request(reqOpt);
      }
      else {
        req = url;
      }
      this.beforeRequest(req);
      return this.http.request(req)
        .do((res: Response) => this.afterCall(res));
    }

    private build(method: RequestMethod, url: string, options: RequestOptionsArgs, body?: string): RequestOptionsArgs {
      let aBody = body ? body : options && options.body ? options.body : undefined
      let opts: RequestOptionsArgs = {
        method: method,
        url: url,
        headers: options && options.headers ? options.headers : new Headers(),
        search: options && options.search ? options.search : undefined,
        body: aBody
      };
      return opts;
    }

    addBeforeHook(func: BeforeHookFunction): void {
      this.beforeHooks.push(func);
    }

    addAfterHook(func: AfterHookFunction): void {
      this.afterHooks.push(func);
    }

    private beforeRequest(req: Request): void {
      if(this.baseUrl) {
        req.url = `${this.baseUrl}/${req.url}`;
      }

      if(this.beforeHooks.length) {
        this.beforeHooks.forEach((hook) => {
          hook.call(this, req);
        })
      }
    }

    private afterCall(res: Response): void {
      if(this.afterHooks.length) {
        this.afterHooks.forEach((hook) => {
          hook.call(this, res);
        })
      }
    }
}
