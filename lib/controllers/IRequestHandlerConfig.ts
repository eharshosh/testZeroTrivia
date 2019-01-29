import * as express from "express";

export interface IRequestHandlerConfig {
    url: string;
    target: express.RequestHandler;
    method: "get" | "post" | "delete" | "put";
}
