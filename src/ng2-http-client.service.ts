import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpClient {
    private baseUrl: string;
    constructor(
      private http: Http
    ) {}

    init(url: string): void {
      this.baseUrl = url;
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
        .do((res: Response) => this.afterCall(req, res));
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

    private beforeRequest(req: Request): void {
      //add headers and everything nice
      if(this.baseUrl) {
        req.url = `${this.baseUrl}/${req.url}`;
      }
    }

    private afterCall(req: Request, res: Response): void {
      //add json api transformation
    }
}
