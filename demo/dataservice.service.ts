import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '../src/http-client.service';

@Injectable()
export class DataService {

  constructor(
    private httpClient: HttpClient
  ){}

  countries(): Observable<Response> {
    let params = new URLSearchParams();
    params.set('username', 'mohuk');
    return this.httpClient.get('countryInfoJSON', {
      search: params
    });
  }
}
