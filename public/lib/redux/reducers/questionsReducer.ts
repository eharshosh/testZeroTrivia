import {fromJS, List, Map} from "immutable";
import * as constants from "../constants";

const initialState = fromJS({
    [constants.QUESTIONS_FETCHED]: false,
    [constants.QUESTIONS]: List(),
    [constants.CURRENTLY_DISPLAYED_QUESTION_INDEX]: 0,
});

export default function(state: Map<any, any> = initialState, action) {
  switch (action.type) {
    case constants.FETCH_QUESTIONS_SUCCESS: {
        return state.set(constants.QUESTIONS_FETCHED, true)
                    .set(constants.QUESTIONS, fromJS(action.questions))
                    .set(constants.CURRENTLY_DISPLAYED_QUESTION_INDEX, 0);
    }
    case constants.CHANGE_SHOWN_QUESTION_INDEX: {
      return state.set(constants.CURRENTLY_DISPLAYED_QUESTION_INDEX, action.index);
    }
    default:
      return state;
  }
}
