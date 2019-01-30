import { IQuestion } from "../models/IQuestion";
import { IQuestionOption } from "../models/IQuestionOption";
import { IQuestionsParser } from "./IQuestionsParser";

export class DefaultQuestionsParser implements IQuestionsParser {

    private static parseQuestion(questionText): IQuestion {
        const [questionNumberLine, text, ...options] = questionText.split("\n");
        const questionNumber: number = parseInt(questionNumberLine.match(/שאלה מספר\s+(\d+)/)[1], 10);
        return {
            options: options.map(DefaultQuestionsParser.parseQuestionOption).filter((o) => o !== null),
            questionNumber,
            text: text.trim(),
            excluded: false
        };
    }

    private static parseQuestionOption(optionText: string): IQuestionOption {
        const match = optionText.match(/(\d+)\.\s*(.*)/);
        if (match) {
            // noinspection JSUnusedLocalSymbols
            const [_, optionNumber, text] = match;
            return {
                isCorrect: optionNumber === "1",
                text: text.trim(),
            };
        }
        return null;
    }
    public parse(questions: string[]): IQuestion[] {
        const result = [];
        for (const questionText of questions) {
            result.push(DefaultQuestionsParser.parseQuestion(questionText));
        }
        return result;
    }
}
