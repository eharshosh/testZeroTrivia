import * as express from "express";
import * as busboy from 'connect-busboy';
import * as memoryStreams from 'memory-streams';

import { DefaultQuestionsParser } from "../services/DefaultQuestionsParser";
import { PdfExtractor } from "../services/PdfExtractor";
import { IRequestHandlerConfig } from "./IRequestHandlerConfig";
import IController from "./IController";

class QuestionsController implements IController {

    public getHandlers(): IRequestHandlerConfig[] {
        return [{
            method: "post",
            target: getQuestions,
            url: "/questions",
        }];
    }

    init(app: express.Application) {
        app.use(busboy({
            immediate: true,
            limits: {
                fileSize: 10 * 1024 * 1024
            }
        }));
    }
}

export default new QuestionsController();

async function getQuestions(req: any, res: express.Response, next: express.NextFunction) {
    let resolvePromise : ()=> void;
    let rejectPromise : ()=> void;
    let dataBuffer = null;
    const promise = new Promise((resolve, reject)=> {
        resolvePromise = resolve;
        rejectPromise = reject;
    });
    if (req.busboy) {
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            const stream = new memoryStreams.WritableStream();
            file.pipe(stream).on('finish', () =>{
                dataBuffer = stream.toBuffer();
                resolvePromise();
            });
        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
            resolvePromise();
        });
    }
    await promise;
    const extractor = new PdfExtractor(dataBuffer);
    const extractedQuestions = await extractor.extractQuestions();
    const parser = new DefaultQuestionsParser();
    res.json(parser.parse(extractedQuestions));
}
