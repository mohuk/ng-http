import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
export declare class HttpClient {
    private http;
    private baseUrl;
    constructor(http: Http);
    init(url: string): void;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    private request(url, options?);
    private build(method, url, options, body?);
    private beforeRequest(req);
    private afterCall(req, res);
}
