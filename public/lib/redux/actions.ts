import * as constants from "./constants";

export const fetchQuestions = (...args: any[]) => ({type: constants.FETCH_QUESTIONS });
export const changeShownQuestionIndex = (index: number) => ({type: constants.CHANGE_SHOWN_QUESTION_INDEX, index });
