import * as pdf from "pdfjs-dist";

import { ITestTextExtractor } from "./ITestTextExtractor";
export class PdfTextExtractor implements ITestTextExtractor {

    private static fixRtlWordOrder(questionText: string): string {
        const result = [];
        for (const line of questionText.split("\n")) {
            const reversedWords = line.trim().split(" ").reverse();
            const questionOptionsMatch = reversedWords[0].match(/^(.*)\.(\d)$/);
            if (questionOptionsMatch) {
                reversedWords[0] = `${questionOptionsMatch[2]}. ${questionOptionsMatch[1]}`;
            }

            const specialCharAtEndOfWordMatch = reversedWords[reversedWords.length - 1].match(/^([:\?\."])(.*)$/);
            if (specialCharAtEndOfWordMatch) {
                if (specialCharAtEndOfWordMatch[1]) {
                    reversedWords[reversedWords.length - 1] = `${specialCharAtEndOfWordMatch[2]}${specialCharAtEndOfWordMatch[1]}`;
                }
            }

            result.push(reversedWords.join(" "));
        }
        return result.join("\n");
    }
    public constructor(private fileStream: Buffer) { }

    public async extractQuestions(): Promise<string[]> {
        const textWithMetadata = await extractPdfText(this.fileStream);
        const text = textWithMetadata.toString();
        const tokens: RegExpExecArray[] = [];
        const exp = /\d+\s+מספר שאלה/g;
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
        return questions.map(PdfTextExtractor.fixRtlWordOrder);
    }
}

async function extractPdfText(dataBuffer) {
    // Disable workers to avoid yet another cross-origin issue (workers need
    // the URL of the script to be loaded, and dynamically loading a cross-origin
    // script does not work).
    pdf.disableWorker = true;
    let doc = await pdf.getDocument(dataBuffer);
    let ret = [];
    for (var i = 1; i <= doc.numPages; i++) {
        const pageData = await doc.getPage(i);
        const pageText = await render_page(pageData);
        ret.push(pageText);
    }
    doc.destroy();
    return ret;
}

async function render_page(pageData) {
    //check documents https://mozilla.github.io/pdf.js/
    let render_options = {
        //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
        normalizeWhitespace: true,
        //do not attempt to combine same line TextItem's. The default value is `false`.
        disableCombineTextItems: false
    }
    const textContent = await pageData.getTextContent(render_options);
    let lastY, line = [];
    const lines = [];
    const itemTransform = (item, x, y) => ({text: item.str, x, y, page: pageData.pageIndex});
    for (let item of textContent.items) {
        const [,,,, x, y] = item.transform;
        if (lastY == y || !lastY) {
            line.push(itemTransform(item, x, y));
        } else {
            lines.push(line);
            line = [itemTransform(item, x, y)];
        }
        lastY = y;
    }
    return lines;
}