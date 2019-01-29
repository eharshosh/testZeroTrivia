import {fromJS, List, Map} from "immutable";
import * as constants from "../constants";

const initialState = fromJS({
    [constants.QUESTIONS_FETCHED]: false,
    [constants.QUESTIONS]: List(),
    [constants.CURRENTLY_DISPLAYED_QUESTION_INDEX]: 0,
    [constants.TEST_STARTED]: false,
    [constants.USER_ANSWERS]: {},
    [constants.TOTAL_GRADE]: null,
    [constants.CORRECT_ANSWERS]: null,
});

export default function(state: Map<any, any> = initialState, action) {
  switch (action.type) {
    case constants.FETCH_QUESTIONS_SUCCESS: {
      const shuffled = action.questions.map(shuffleAnswers);
      return state.set(constants.QUESTIONS_FETCHED, true)
                  .set(constants.QUESTIONS, fromJS(shuffled));
    }
    case constants.CHANGE_SHOWN_QUESTION_INDEX: {
      return state.set(constants.CURRENTLY_DISPLAYED_QUESTION_INDEX, action.index);
    }
    case constants.BEGIN_TEST: {
      return state.set(constants.CURRENTLY_DISPLAYED_QUESTION_INDEX, 0)
                  .set(constants.TEST_STARTED, true)
                  .set(constants.USER_ANSWERS, List());
    }
    case constants.MARK_USER_ANSWER: {
      return state.setIn([constants.USER_ANSWERS, action.questionIndex], action.answerIndex);
    }
    case constants.END_TEST: {
      const questions = state.get(constants.QUESTIONS);
      const correctAnswersCount = questions.filter((question, questionIndex) => {
        const userAnswer = state.getIn([constants.USER_ANSWERS, questionIndex]);
        const correctAnswerIndex = question.get("options").findIndex((option) => option.get("isCorrect"));
        return userAnswer === correctAnswerIndex;
      }).size;
      return state.set(constants.TEST_STARTED, false)
                  .set(constants.CORRECT_ANSWERS, correctAnswersCount)
                  .set(constants.TOTAL_GRADE, correctAnswersCount / (questions.size + 1) * 100);
    }
    default:
      return state;
  }
}

function shuffleAnswers(question) {
  return ({
    ...question,
    options: shuffleArray(question.options),
  });
}

function shuffleArray(src) {
  const result = [...src];
  for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
