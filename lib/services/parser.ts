import { Question } from "../models/question";
import { QuestionOption } from "../models/questionOption";
import { IQuestionsParser } from "./IQuestionsParser";

export class defaultQuestionsParser implements IQuestionsParser {
    parse(questions: string[]): Question[] {
        const result = [];
        for (let questionText of questions) {
            result.push(defaultQuestionsParser.parseQuestion(questionText));
        }
        return result;
    }

    private static parseQuestion(questionText): Question {
        const [questionNumberLine, text, ...options] = questionText.split('\n');
        const questionNumber = parseInt(questionNumberLine.match(/שאלה מספר (\d+)/)[1]);
        return {
            text: text.trim(),
            questionNumber,
            options: options.map(defaultQuestionsParser.parseQuestionOption).filter(o => o !== null)
        };
    }

    private static parseQuestionOption(optionText: string): QuestionOption {
        const match = optionText.match(/(\d+)\. (.*)/);
        if (match) {
            // noinspection JSUnusedLocalSymbols
            const [_, optionNumber, text] = match;
            return {
                isCorrect: optionNumber === '1',
                text: text.trim()
            }
        }
        return null;
    }
}
