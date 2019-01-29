import * as constants from "./constants";

export const questionsFetched = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS_FETCHED]);
export const questionsList = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS]);

export const currentQuestionIndex = (state) =>
    state.getIn([constants.QUESTIONS_BRANCH, constants.CURRENTLY_DISPLAYED_QUESTION_INDEX]);
