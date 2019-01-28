import {Question} from "../models/question";

export interface IQuestionsParser {
    parse(questions: string[]): Question[];
}
