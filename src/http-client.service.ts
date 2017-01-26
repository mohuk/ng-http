import { Observable } from 'rxjs/Rx';
import { Inject, Injectable } from '@angular/core';
import { NgHttpConfig, BeforeHookFunction, AfterHookFunction } from './http-client.config';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response, Request, RequestMethod } from '@angular/http';

@Injectable()
export class HttpClient {
    private baseUrl: string;
    private beforeHooks: Array<BeforeHookFunction>;
    private errorHooks: Array<AfterHookFunction>;
    private afterHooks: Array<AfterHookFunction>;
    constructor(
      private http: Http,
      @Inject('ngHttpConfig') private ngHttpConfig: NgHttpConfig
    ) {
      this.beforeHooks = ngHttpConfig.beforeHook ? [ngHttpConfig.beforeHook] : [];
      this.afterHooks = ngHttpConfig.afterHook? [ngHttpConfig.afterHook] : [];
      this.errorHooks = ngHttpConfig.errorHook? [ngHttpConfig.errorHook] : [];
      this.baseUrl = ngHttpConfig.baseUrl;
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

      return this.beforeRequest(req)
        .flatMap((req: Request) => this.http.request(req))
        .map((res: Response) => this.afterCall(res))
        .catch(error => {
          this.errorHandler(error);
          return Observable.throw(error.json())
        });
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

    private beforeRequest(req: Request): Observable<Request> {
      if(this.baseUrl) {
        req.url = `${this.baseUrl}/${req.url}`;
      }

      if(this.beforeHooks.length) {
        return Observable.fromPromise<Request>(
          this.beforeHooks.reduce<any>((previousValue, currentValue) => {
          return previousValue
            .then((res: Request) => {
              return currentValue(res);
            });
        }, Promise.resolve(req)));
      } else {
        return Observable.of(req);
      }
    }

    private afterCall(res: Response): any {
      this.afterHooks.forEach((hook) => {
        res = hook(res);
      });
      return res;
    }

    private errorHandler(res: Response): any {
      if(this.errorHooks.length) {
        this.errorHooks.forEach(hook => {
          res = hook(res);
        });
        return res;
      }
      return res;
    }
}
