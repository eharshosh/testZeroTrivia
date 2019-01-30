import * as express from "express";
import { IRequestHandlerConfig } from "./IRequestHandlerConfig";
import questionsController from "./QuestionsController";
import IController from "./IController";

const controllers: IController[] = [
    questionsController,
];

export function init(app: express.Application) {
    for (const controller of controllers) {
        controller.init(app);
        for (const handler of controller.getHandlers()) {
            app[handler.method](handler.url, wrapWithExceptionHandler(handler));
        }
    }
}

function wrapWithExceptionHandler(handler: IRequestHandlerConfig) {
    return async (req, res, next) => {
        try {
            console.info(`handling ${handler.method} ${handler.url}`);
            await handler.target(req, res, next);
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    };
}
