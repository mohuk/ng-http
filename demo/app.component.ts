import { Component, OnInit } from '@angular/core';
import { URLSearchParams, Request, Headers } from '@angular/http';
import { DataService } from './dataservice.service';

@Component({
  selector: 'app',
  template: `
    <ul><li *ngFor="let country of countries">{{country.countryName}}</li></ul>
  `
})
export class AppComponent implements OnInit {
  public countries: any;
  constructor(
    private dataservice: DataService
  ){}

  ngOnInit() {
    this.dataservice.countries()
      .subscribe(res => {
        this.countries = res;
      });
  }
}
