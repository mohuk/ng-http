import { NgHttpConfig } from '../src/http-client.config';
import { Response, Request } from '@angular/http';

export const ngHttpConfig: NgHttpConfig = {
  baseUrl: 'http://api.geonames.org',
  afterHook: (res: Response) => {
    return res.json().geonames;
  },
  beforeHook: (req: Request) => {
    console.log(req);
    return req;
  }
}
