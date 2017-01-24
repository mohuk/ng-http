import { NgHttpConfig, AfterHookFunction, BeforeHookFunction } from '../src/http-client.config';
import { Response, Request } from '@angular/http';

export class NgHttpConfigDetail implements NgHttpConfig  {

  baseUrl: string;
  afterHook: AfterHookFunction;
  errorHook: AfterHookFunction;
  beforeHook: BeforeHookFunction;

  constructor() {
    this.baseUrl = 'http://api.geonames.org';

    this.afterHook = (res: Response) => {
      return res.json().geonames;
    };

    this.beforeHook = (req: Request) => {
      console.log(req);
      return req;
    };

    this.errorHook = (req: Request) => console.log('Error Occurred');
  }
}
