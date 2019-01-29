import * as express from "express";
import * as fs from "fs";
import { DefaultQuestionsParser } from "../services/DefaultQuestionsParser";
import { PdfExtractor } from "../services/PdfExtractor";
import { IRequestHandlerConfig } from "./IRequestHandlerConfig";

export function handlers(): IRequestHandlerConfig[] {
    return  [{
        method: "get",
        target: getQuestions,
        url: "/questions",
    }];
}

async function getQuestions(req: express.Request, res: express.Response, next: express.NextFunction) {
    const dataBuffer = fs.readFileSync("C:\\Users\\ehars_000\\Downloads\\__מבחן בתזונה לתלמידי סיעוד מועד א_0_.pdf");
    const extractor = new PdfExtractor(dataBuffer);
    const extractedQuestions = await extractor.extractQuestions();
    const parser = new DefaultQuestionsParser();
    res.json(parser.parse(extractedQuestions));
}
