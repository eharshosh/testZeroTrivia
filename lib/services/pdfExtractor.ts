import * as pdf from "pdf-parse";
import { ITestTextExtractor } from "./ITestTextExtractor";
export class PdfExtractor implements ITestTextExtractor {

    private static fixRtlWordOrder(questionText: string): string {
        const result = [];
        for (const line of questionText.split("\n")) {
            const reversedWords = line.trim().split(" ").reverse();
            const questionOptionsMatch = reversedWords[0].match(/^(.*)\.(\d)$/);
            if (questionOptionsMatch) {
                reversedWords[0] = `${questionOptionsMatch[2]}. ${questionOptionsMatch[1]}`;
            }

            const specialCharAtEndOfWordMatch = reversedWords[reversedWords.length - 1].match(/([:\?\."])(.*)$/);
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
        const { text } = await pdf(this.fileStream);
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
        return questions.map(PdfExtractor.fixRtlWordOrder);
    }
}
