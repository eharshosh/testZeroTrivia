"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdf = require("pdf-parse");
class PdfExtractor {
    constructor(fileStream) {
        this.fileStream = fileStream;
    }
    extractQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const { text } = yield pdf(this.fileStream);
            const tokens = [];
            let result;
            const exp = /\d+ מספר שאלה/g;
            while ((result = exp.exec(text)) !== null) {
                tokens.push(result);
            }
            const questions = [];
            for (let i = 0; i < tokens.length - 1; i++) {
                questions.push(text.substring(tokens[i].index, tokens[i + 1].index));
            }
            questions.push(text.substring(tokens[tokens.length - 1].index));
            return questions.map(PdfExtractor.fixRtlWordOrder);
        });
    }
    static fixRtlWordOrder(questionText) {
        const result = [];
        for (let line of questionText.split('\n')) {
            const reversedWords = line.split(' ').reverse();
            const questionOptionsMatch = reversedWords[0].match(/^(.*)\.(\d)$/);
            if (questionOptionsMatch) {
                reversedWords[0] = `${questionOptionsMatch[2]}. ${questionOptionsMatch[1]}`;
            }
            const questionTitleMatch = reversedWords[reversedWords.length - 1].match(/:(.*)$/);
            if (questionTitleMatch) {
                if (!questionTitleMatch[1]) {
                    continue;
                }
                reversedWords[reversedWords.length - 1] = `${questionTitleMatch[1]}:`;
            }
            result.push(reversedWords.join(' '));
        }
        return result.join('\n');
    }
}
exports.PdfExtractor = PdfExtractor;
//# sourceMappingURL=pdfExtractor.js.map