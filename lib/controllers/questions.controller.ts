import * as fs from "fs";
import {PdfExtractor} from "../services/pdfExtractor";
import {defaultQuestionsParser} from "../services/parser";
import {NextFunction, Request, Response} from "express-serve-static-core";
import * as express from "express";

export function setup(app: express.Application) {
        app.get('/questions', getQuestions);
}

async function getQuestions(req: Request, res: Response, next: NextFunction) {
    const dataBuffer = fs.readFileSync('test.pdf');
    const extractor = new PdfExtractor(dataBuffer);
    const extractedQuestions = await extractor.extractQuestions();
    const parser = new defaultQuestionsParser();
    res.json(parser.parse(extractedQuestions));
}
