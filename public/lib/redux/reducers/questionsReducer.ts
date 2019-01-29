import {fromJS, List, Map} from "immutable";
import * as constants from "../constants";

const initialState = fromJS({
    [constants.QUESTIONS_FETCHED]: false,
    [constants.QUESTIONS]: List(),
});

export default function(state: Map<any, any> = initialState, action) {
  switch (action.type) {
    case constants.FETCH_QUESTIONS_SUCCESS: {
        return state.set(constants.QUESTIONS_FETCHED, true)
                    .set(constants.QUESTIONS, fromJS(action.questions));
    }
    default:
      return state;
  }
}
