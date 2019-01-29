import * as express from "express";
import * as questionsController from "./QuestionsController";
import { RequestHandler } from "express-serve-static-core";

const handlers = [
    ...questionsController.handlers()
]

export function setupRoutes(app: express.Application) {
    for (const handler of handlers) {
        app[handler.method](handler.url, wrapWithExceptionHandler(handler.target))
    }
}

function wrapWithExceptionHandler(target: RequestHandler) : RequestHandler {
    return (req, res, next) => {
        try {
            target(req, res, next);
        }
        catch(err) {
            console.error(err);
            res.status(500).send();
        }
    }
}