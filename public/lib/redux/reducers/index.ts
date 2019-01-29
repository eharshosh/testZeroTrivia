import { fromJS, Map } from "immutable";
import { combineReducers } from "redux";
import * as constants from "../constants";
import questionReducer from "./questionsReducer";

const rooteducer = (state, action) => fromJS({
    [constants.QUESTIONS_BRANCH]: questionReducer(state ? state.get(constants.QUESTIONS_BRANCH) : undefined, action),
});
export default rooteducer;
