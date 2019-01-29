import { IQuestionOption } from "./IQuestionOption";

export interface IQuestion {
    questionNumber: number;
    text: string;
    options: IQuestionOption[];
}
