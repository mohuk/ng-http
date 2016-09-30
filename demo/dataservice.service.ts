import { Injectable } from '@angular/core';
import { Request, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/rx';
import { HttpClient } from '../src/ng2-http-client.service';

@Injectable()
export class DataService {

  constructor(
    private httpClient: HttpClient
  ){
    this.httpClient.init('http://api.geonames.org');
  }

  countries(): Observable<Response> {
    let params = new URLSearchParams();
    params.set('username', 'mohuk');
    return this.httpClient.get('countryInfoJSON', {
      search: params
    })
    .map(res => res.json().geonames)
  }
}
