import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../src/ng2-http-client.service';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app',
  template: `
    <ul><li *ngFor="let country of countries">{{country.countryName}}</li></ul>
  `
})
export class AppComponent implements OnInit {
  public countries: any;
  constructor(
    private httpClient: HttpClient
  ){
    httpClient.init('http://api.geonames.org')
  }

  ngOnInit() {
    let params = new URLSearchParams();
    params.set('username', 'mohuk');
    this.httpClient.get('countryInfoJSON', {
      search: params
    })
    .map(res => res.json())
    .subscribe((res) => {
      this.countries = res.geonames;
    });
  }
}
