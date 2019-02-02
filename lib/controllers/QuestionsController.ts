import * as express from "express";
import * as busboy from 'connect-busboy';
import { DefaultQuestionsParser } from "../services/DefaultQuestionsParser";
import { PdfTextExtractor } from "../services/PdfTextExtractor";
import { IRequestHandlerConfig } from "./IRequestHandlerConfig";
import IController from "./IController";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

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
                fileSize: MAX_FILE_SIZE
            }
        }));
    }
}

export default new QuestionsController();

async function getQuestions(req: express.Request, res: express.Response, next: express.NextFunction) {
    let resolvePromise : ()=> void;
    let rejectPromise : ()=> void;
    let dataBuffers: Buffer[] = [];
    setTimeout(()=>rejectPromise(), 60 * 1000);
    const promise = new Promise((resolve, reject)=> {
        resolvePromise = resolve;
        rejectPromise = reject;
    });
    const busboy = (req as any).busboy;
    if (busboy) {
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File: ' + filename + ', mimetype: ' + mimetype);
            file.on('data', function(data) {
                dataBuffers.push(data);
            });
        })
        .on('field', function(key, value, keyTruncated, valueTruncated) {
            console.log('Field: ' + key + ', mimetype: ' + value);
        })
         .on('finish', resolvePromise)
        .on('error', rejectPromise);
    }
    await promise;
    const extractor = new PdfTextExtractor(Buffer.concat(dataBuffers));
    const extractedQuestions = await extractor.extractQuestions();
    const parser = new DefaultQuestionsParser();
    const parsed = parser.parse(extractedQuestions);
    res.json(parsed);
}
