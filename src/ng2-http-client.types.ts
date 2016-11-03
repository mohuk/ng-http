import { Request, Response } from '@angular/http';

export declare type BeforeHookFunction = (req: Request) => Promise<Request> | Request
export declare type AfterHookFunction = (res: any) => any
