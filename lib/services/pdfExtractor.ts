import {ITestTextExtractor} from "./ITestTextExtractor";
import * as pdf from 'pdf-parse';
export class PdfExtractor implements ITestTextExtractor {
    public constructor(private fileStream: Buffer){}

    async extractQuestions() : Promise<string[]> {
        const {text} = await pdf(this.fileStream);
        const tokens: RegExpExecArray[] = [];
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
    }

    private static fixRtlWordOrder(questionText: string) : string {
        const result = [];
        for (let line of questionText.split('\n')){
            const reversedWords = line.split(' ').reverse();
            const questionOptionsMatch = reversedWords[0].match(/^(.*)\.(\d)$/);
            if (questionOptionsMatch) {
                reversedWords[0] = `${questionOptionsMatch[2]}. ${questionOptionsMatch[1]}`;
            }

            const questionTitleMatch = reversedWords[reversedWords.length-1].match(/:(.*)$/);
            if (questionTitleMatch) {
                if (!questionTitleMatch[1]) {
                    continue;
                }
                reversedWords[reversedWords.length-1] = `${questionTitleMatch[1]}:`;
            }

            result.push(reversedWords.join(' '));
        }
        return result.join('\n');
    }
}
