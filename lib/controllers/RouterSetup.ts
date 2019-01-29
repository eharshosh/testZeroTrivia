import * as express from "express";
import { IRequestHandlerConfig } from "./IRequestHandlerConfig";
import * as questionsController from "./QuestionsController";

const handlers: IRequestHandlerConfig[] = [
    ...questionsController.handlers(),
];

export function setupRoutes(app: express.Application) {
    for (const handler of handlers) {
        app[handler.method](handler.url, wrapWithExceptionHandler(handler));
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
