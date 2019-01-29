import * as express from "express";
import * as fs from "fs";
import { defaultQuestionsParser } from "../services/parser";
import { PdfExtractor } from "../services/pdfExtractor";
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
    const parser = new defaultQuestionsParser();
    res.json(parser.parse(extractedQuestions));
}
