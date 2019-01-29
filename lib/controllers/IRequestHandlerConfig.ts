import { RequestHandler } from "express-serve-static-core";
export interface IRequestHandlerConfig {
    url: string;
    target: RequestHandler;
    method: "get" | "post" | "delete" | "put";
}