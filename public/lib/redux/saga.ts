import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as Api from "../api";
import * as constants from "./constants";

function* fetchQuestions(action) {
   try {
      const questions = yield call(Api.fetchQuestions, action.payload.userId);
      yield put({type: constants.FETCH_QUESTIONS_SUCCESS, questions});
   } catch (e) {
      yield put({type: constants.FETCH_QUESTIONS_ERROR, message: e.message});
   }
}

function* mySaga() {
  yield takeLatest(constants.FETCH_QUESTIONS, fetchQuestions);
}

export default mySaga;
