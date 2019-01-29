import * as fs from "fs";
import { PdfExtractor } from "../services/pdfExtractor";
import { defaultQuestionsParser } from "../services/parser";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { IRequestHandlerConfig } from "./IRequestHandlerConfig";

export function handlers() : IRequestHandlerConfig[]{
    return  [{
        url: '/questions', 
        target: getQuestions,
        method: "get"        
    }];
}

async function getQuestions(req: Request, res: Response, next: NextFunction) {   
    const dataBuffer = fs.readFileSync('test.pdf');
    const extractor = new PdfExtractor(dataBuffer);
    const extractedQuestions = await extractor.extractQuestions();
    const parser = new defaultQuestionsParser();
    res.json(parser.parse(extractedQuestions));    
}