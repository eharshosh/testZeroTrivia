"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class defaultQuestionsParser {
    parse(questions) {
        const result = [];
        for (let questionText of questions) {
            result.push(defaultQuestionsParser.parseQuestion(questionText));
        }
        return result;
    }
    static parseQuestion(questionText) {
        const [questionNumberLine, text, ...options] = questionText.split('\n');
        const questionNumber = Number.parseInt(questionNumberLine.match(/שאלה מספר (\d+)/)[1]);
        return {
            text: text.trim(),
            questionNumber,
            options: options.map(defaultQuestionsParser.parseQuestionOption).filter(o => o !== null)
        };
    }
    static parseQuestionOption(optionText) {
        const match = optionText.match(/(\d+)\. (.*)/);
        if (match) {
            // noinspection JSUnusedLocalSymbols
            const [_, optionNumber, text] = match;
            return {
                isCorrect: optionNumber === '1',
                text: text.trim()
            };
        }
        return null;
    }
}
exports.defaultQuestionsParser = defaultQuestionsParser;
//# sourceMappingURL=parser.js.map