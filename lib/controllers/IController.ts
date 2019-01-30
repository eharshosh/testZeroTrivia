import * as express from "express";
import {IRequestHandlerConfig} from "./IRequestHandlerConfig";

export default interface IController {
    getHandlers(): IRequestHandlerConfig[];
    init(app: express.Application);
}
