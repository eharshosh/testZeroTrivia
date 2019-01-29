import * as constants from "./constants";

export const questionsFetched = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS_FETCHED]);
export const questionsList = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS]);
export const userAnswers = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.USER_ANSWERS]);
export const currentQuestionIndex = (state) =>
    state.getIn([constants.QUESTIONS_BRANCH, constants.CURRENTLY_DISPLAYED_QUESTION_INDEX]);
export const testStarted = (state) =>
    state.getIn([constants.QUESTIONS_BRANCH, constants.TEST_STARTED]);
export const totalGrade = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.TOTAL_GRADE]);
export const correctAnswers = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.CORRECT_ANSWERS]);
