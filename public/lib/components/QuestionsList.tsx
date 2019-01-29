import {List, Record} from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Card, Pagination } from "semantic-ui-react";
import { IQuestion } from "../../../lib/models/IQuestion";
import * as actions from "../redux/actions";
import * as selectors from "../redux/selectors";
import "../styles.less";
import { SingleQuestion } from "./SingleQuestion";

interface IQuestionsListProps {
    actions: { fetchQuestions: () => void, changeShownQuestionIndex: (index) => void };
    questions: List<Record<IQuestion>>;
    currentQuestionIndex: number;
 }

class QuestionsList extends React.PureComponent<IQuestionsListProps> {

    public onQuestionChange = (e, p) => {
        return this.props.actions.changeShownQuestionIndex(p.activePage - 1);
    }

    public render() {
        return (
            <div className="questionsList">
                <div className="questionContainer">
                    <SingleQuestion question={this.props.questions.get(this.props.currentQuestionIndex)} />
                </div>
                <Pagination
                    totalPages={this.props.questions.size}
                    activePage={this.props.currentQuestionIndex + 1}
                    onPageChange={this.onQuestionChange}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentQuestionIndex: selectors.currentQuestionIndex(state),
    questions: selectors.questionsList(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
