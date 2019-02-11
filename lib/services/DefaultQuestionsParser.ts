import { IQuestion } from "../models/IQuestion";
import { IQuestionOption } from "../models/IQuestionOption";
import { IQuestionsParser } from "./IQuestionsParser";

export class DefaultQuestionsParser implements IQuestionsParser {

    public parse(questions: string[]): IQuestion[] {
        const result = [];
        for (const questionText of questions) {
            result.push(DefaultQuestionsParser.parseQuestion(questionText));
        }
        return result;
    }
    
    private static parseQuestion(questionText): IQuestion {
        const [questionNumberLine, ...textAndOptions] = questionText.split("\n")        
        const questionNumber: number = parseInt(questionNumberLine.match(/(\d+)/)[1], 10);
        const textLinesCount = textAndOptions.findIndex((line)=> line.startsWith("1 "));
        const text = textAndOptions.slice(0, textLinesCount).join('\n');
        const options = textAndOptions.slice(textLinesCount);
        return {
            options: options.map(DefaultQuestionsParser.parseQuestionOption).filter((o) => o !== null),
            questionNumber,
            text: text.trim(),
            excluded: false
        };
    }

    private static parseQuestionOption(optionText: string): IQuestionOption {
        const match = optionText.match(/(.*)\s* (\d+)/);
        if (match) {            
            const [, text, optionNumber] = match;
            return {
                isCorrect: optionNumber === "1",
                text: text.trim(),
            };
        }
        return null;
    }

    
}
