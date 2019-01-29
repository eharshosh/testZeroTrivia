import { IQuestion } from "../models/IQuestion";

export interface IQuestionsParser {
    parse(questions: string[]): IQuestion[];
}
