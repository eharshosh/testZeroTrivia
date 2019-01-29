import {List, Map, Record} from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Pagination } from "semantic-ui-react";
import { IQuestion } from "../../../lib/models/IQuestion";
import AppActions, {IAppActions} from "../redux/actions";
import * as selectors from "../redux/selectors";
import "../styles.less";
import { SingleQuestion } from "./SingleQuestion";

interface IQuestionsListProps {
    actions: IAppActions;
    questions: List<Record<IQuestion>>;
    answers: Map<number, number>;
    currentQuestionIndex: number;
 }

class QuestionsList extends React.PureComponent<IQuestionsListProps> {

    public onQuestionChange = (_, p) =>
        this.props.actions.changeShownQuestionIndex(p.activePage - 1)

    public onSelectAnswer = (answerId) =>
        this.props.actions.markUserAnswer(this.props.currentQuestionIndex, answerId)

    public render() {
        return (
            <div className="questionsList">
                <div className="questionContainer">
                    <SingleQuestion
                        question={this.props.questions.get(this.props.currentQuestionIndex)}
                        onSelectAnswer={this.onSelectAnswer}
                        onEndTest={this.props.actions.endTest}
                        selectedAnswer={this.props.answers.get(this.props.currentQuestionIndex)}
                    />
                </div>
                <Pagination
                    totalPages={this.props.questions.size}
                    activePage={this.props.currentQuestionIndex + 1}
                    onPageChange={this.onQuestionChange}
                    firstItem={null}
                    lastItem={null}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    answers: selectors.userAnswers(state),
    currentQuestionIndex: selectors.currentQuestionIndex(state),
    questions: selectors.questionsList(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AppActions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
