import * as constants from "./constants";

export interface IReduxAction { type: string; }
export interface IAppActions {
    fetchQuestions: (...args: any[]) => IReduxAction;
    changeShownQuestionIndex: (index: number) => IReduxAction;
    beginTest: (...args: any[]) => IReduxAction;
    markUserAnswer: (questionIndex: number, answerIndex: number) => IReduxAction;
}

const actions: IAppActions = {
    beginTest: (...args: any[]) => ({type: constants.BEGIN_TEST }),
    changeShownQuestionIndex: (index: number) =>
        ({type: constants.CHANGE_SHOWN_QUESTION_INDEX, index }),
    fetchQuestions: (...args: any[]) => ({type: constants.FETCH_QUESTIONS }),
    markUserAnswer: (questionIndex: number, answerIndex: number) =>
        ({type: constants.MARK_USER_ANSWER, questionIndex, answerIndex  }),
};

export default actions;
