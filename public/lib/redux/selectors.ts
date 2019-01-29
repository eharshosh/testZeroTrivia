import * as constants from "./constants";

export const questionsFetched = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS_FETCHED]);
export const getQuestionsList = (state) => state.getIn([constants.QUESTIONS_BRANCH, constants.QUESTIONS]);
