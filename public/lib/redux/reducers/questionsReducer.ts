import {fromJS, List, Map} from "immutable";
import * as constants from "../constants";

const initialState = fromJS({
    [constants.QUESTIONS_FETCHED]: false,
    [constants.QUESTIONS]: [],
    [constants.TEST_STATE]: constants.TEST_STATE_NOT_STARTED,
    [constants.USER_ANSWERS]: {},
    [constants.TOTAL_GRADE]: null,
    [constants.CORRECT_ANSWERS]: null
});

export default function(state: Map<any, any> = initialState, action) {
  switch (action.type) {
    case constants.FETCH_QUESTIONS: {
      return state
        .set(constants.QUESTIONS_FETCHED, false)
        .set(constants.UPLOADING_FILE, true);
    }
    case constants.FETCH_QUESTIONS_SUCCESS: {
      const shuffled = action.questions.map(shuffleAnswers);
      return state.set(constants.QUESTIONS_FETCHED, true)
                  .set(constants.TEST_STATE, constants.TEST_STATE_STARTED)
                  .set(constants.USER_ANSWERS, List())
                  .set(constants.UPLOADING_FILE, false)
                  .set(constants.QUESTIONS, fromJS(shuffled))
                  .delete(constants.UPLOAD_ERROR);
    }
    case constants.FETCH_QUESTIONS_ERROR: {
      return state.set(constants.QUESTIONS_FETCHED, false)
                  .set(constants.UPLOADING_FILE, false)
                  .set(constants.UPLOAD_ERROR, action.message);
    }
    case constants.BEGIN_TEST: {
      return state.set(constants.TEST_STATE, constants.TEST_STATE_STARTED)
                  .set(constants.USER_ANSWERS, List());
    }
    case constants.MARK_USER_ANSWER: {
      return state.setIn([constants.USER_ANSWERS, action.questionIndex], action.answerIndex);
    }
    case constants.END_TEST: {
      const questions = state.get(constants.QUESTIONS);      
      const correctAnswersCount = questions.filter((question, questionIndex) => {
        if (question.get(constants.QUESTION_EXCLUDED)) {
          return false;
        }
        const userAnswer = state.getIn([constants.USER_ANSWERS, questionIndex]);
        const correctAnswerIndex = question.get("options").findIndex((option) => option.get("isCorrect"));
        return userAnswer === correctAnswerIndex;
      }).size;
      const nonExcludedQuestions = questions.filter(question=> !question.get(constants.QUESTION_EXCLUDED));
      return state.set(constants.TEST_STATE, constants.TEST_STATE_ENDED)
                  .set(constants.CORRECT_ANSWERS, correctAnswersCount)
                  .set(constants.TOTAL_GRADE, correctAnswersCount / (nonExcludedQuestions.size + 1) * 100);
    }
    case constants.TOGGLE_QUESTION_EXCLUSION: {
      const currentValue = state.getIn([constants.QUESTIONS, action.questionIndex, constants.QUESTION_EXCLUDED]);
      return state.setIn([constants.QUESTIONS, action.questionIndex, constants.QUESTION_EXCLUDED], !currentValue);
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
