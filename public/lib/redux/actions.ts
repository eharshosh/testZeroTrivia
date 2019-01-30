import * as constants from "./constants";

export class AppActions {
    public beginTest = () => ({type: constants.BEGIN_TEST });
    public endTest = () => ({type: constants.END_TEST });
    public fetchQuestions = (file: File) => ({type: constants.FETCH_QUESTIONS, file });
    public markUserAnswer = (questionIndex: number, answerIndex: number) =>
        ({type: constants.MARK_USER_ANSWER, questionIndex, answerIndex  });
}

export default new AppActions();
