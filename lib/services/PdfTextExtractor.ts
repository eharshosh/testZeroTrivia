import * as pdf from "pdfjs-dist";
import * as fs from 'fs';

import { ITestTextExtractor } from "./ITestTextExtractor";
export class PdfTextExtractor implements ITestTextExtractor {
    
    public constructor(private fileStream: Buffer) { }

    public async extractQuestions(): Promise<string[]> {
        const text = await extractPdfText(this.fileStream);
        const tokens: RegExpExecArray[] = [];
        const exp = /\d+ שאלה מספר/g;
        let result = exp.exec(text);
        while (result !== null) {
            tokens.push(result);
            result = exp.exec(text);
        }
        const questions = [];
        for (let i = 0; i < tokens.length - 1; i++) {
            questions.push(text.substring(tokens[i].index, tokens[i + 1].index));
        }
        questions.push(text.substring(tokens[tokens.length - 1].index));
        return questions;
    }
}

async function extractPdfText(dataBuffer) {
    // Disable workers to avoid yet another cross-origin issue (workers need
    // the URL of the script to be loaded, and dynamically loading a cross-origin
    // script does not work).
    pdf.disableWorker = true;
    let doc = await pdf.getDocument(dataBuffer);
    let pages = [];
    for (var i = 1; i <= doc.numPages; i++) {
        const pageData = await doc.getPage(i);
        const pageText = await render_page(pageData);
        pages.push(pageText);
    }
    doc.destroy();
    let ret = '';

    for (const page of pages) {
        for (const line of page) {
            let phrase = {words: [], dir: line[0].dir };
            let linePhrases = [phrase];            
            for (const word of line) {
                if (word.dir !== phrase.dir && word.str.length > 1) {                    
                    phrase = {words: [word.str], dir: word.dir };
                    linePhrases.push(phrase);
                } else {
                    phrase.words.push(word.str);
                }                
            }           
            const words = linePhrases.map(ph=> ph.dir == "rtl" ? ph.words.reverse().join('') : ph.words.join(''));
            const lineText = words.join('');
            ret += lineText + "\n";
        }
    }
    return ret;
}

async function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: true,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: true
    }
    const textContent = await pageData.getTextContent(render_options);
    let lastY, line = [];
    const lines = [];    
    for (let item of textContent.items) {
        const [,,,,, y] = item.transform;
        if (lastY == y || !lastY) {
            line.push(item);
        } else {
            lines.push(line);
            line = [item];
        }
        lastY = y;
    }
    return lines;
}