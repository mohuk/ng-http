import { Request, Response } from '@angular/http';

export declare type BeforeHookFunction = (req: Request) => void
export declare type AfterHookFunction = (res: any) => any
