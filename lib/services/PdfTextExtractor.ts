import * as pdf from "pdfjs-dist";
import { ITestTextExtractor } from "./ITestTextExtractor";
import { createCanvas } from "canvas";
import { spawn } from 'child_process';
import * as fs from "fs";

export class PdfTextExtractor implements ITestTextExtractor {

    public constructor(private fileStream: Buffer) { }

    public async extractQuestions(): Promise<string[]> {
        const text = await extractPdfText(this.fileStream);
        fs.writeFileSync('c:/personal/test.txt', text);
        const tokens: RegExpExecArray[] = [];
        const exp = /שאלה מספר \d+/g;
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
    const firstPage = await doc.getPage(1);
    var viewport = firstPage.getViewport(4);
    const canvas = createCanvas(viewport.width, viewport.height * doc.numPages);
    const context = canvas.getContext('2d');
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    for (let i = 2; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        await page.render(renderContext);
        context.translate(0, viewport.height);
    }
    const result = canvas.toBuffer('image/png', { compressionLevel: 1, filters: canvas.PNG_FILTER_NONE });
    fs.writeFileSync('c:/personal/test.png', result);
    doc.destroy();
    const pageText = await extractImageText(result);
    return pageText;
}


async function extractImageText(buffer: Buffer) {
    const child = spawn("C:/Program Files (x86)/Tesseract-OCR/tesseract.exe",
        ["stdin", "stdout", "-l", "heb", "--dpi", "300", "--psm", "6"]);
    child.stdin.write(buffer);
    child.stdin.end(); /// this call seems necessary, at least with plain node.js executable
    type childProcessExecResults = { code: Number, stderr: string, stdout: string };
    const execResults = await new Promise<childProcessExecResults>
        ((resolve, reject) => {
            const result = { stdout: '', stderr: '', code: 0 };
            child.stdout.on('data', function (data) {
                result.stdout += data.toString()
            });
            child.stderr.on('data', function (data) {
                result.stderr += data.toString()
            });
            child.on('close', function (code) {
                result.code = code;
                resolve(result)
            });
            child.on('error', function (err) { reject(err) });
        });
    if (execResults.code !== 0) {
        throw new Error(`Process exited with code ${execResults.code},
                        STD_OUT:\n${execResults.stdout}\n\nSTD_ERR:\n${execResults.stderr}`)
    }
    return execResults.stdout;
}