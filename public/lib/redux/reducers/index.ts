import { combineReducers } from "redux";
import * as constants from "../constants";
import questionReducer from "./questionsReducer";

export default combineReducers({
    [constants.QUESTIONS_BRANCH]: questionReducer,
});
