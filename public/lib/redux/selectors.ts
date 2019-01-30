import * as constants from "./constants";

export const questionsFetched = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS_FETCHED]);
export const uploadingFile = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.UPLOADING_FILE]);
export const questionsList = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS]);
export const userAnswers = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.USER_ANSWERS]);
export const testState = (state) =>
    state.getIn([constants.QUESTIONS_BRANCH, constants.TEST_STATE]);
export const totalGrade = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.TOTAL_GRADE]);
export const correctAnswers = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.CORRECT_ANSWERS]);
