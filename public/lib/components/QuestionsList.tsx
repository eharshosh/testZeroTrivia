import {List, Map, Record} from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {Button, Pagination} from "semantic-ui-react";
import { IQuestion } from "../../../lib/models/IQuestion";
import AppActions, {IAppActions} from "../redux/actions";
import * as selectors from "../redux/selectors";
import "../styles.less";
import { SingleQuestion } from "./SingleQuestion";

interface IQuestionsListProps {
    actions: IAppActions;
    questions: List<Record<IQuestion>>;
    answers: Map<number, number>;
 }

class QuestionsList extends React.PureComponent<IQuestionsListProps> {

    public render() {
        return (
            <div className="questions-container">
                {this.props.questions.map((question, questionIndex)=>
                    <SingleQuestion
                        key={questionIndex.toString()}
                        question={question}
                        onSelectAnswer={(answerIndex)=>
                            this.props.actions.markUserAnswer(questionIndex, answerIndex)}
                        selectedAnswer={this.props.answers.get(questionIndex)}
                    />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    answers: selectors.userAnswers(state),
    questions: selectors.questionsList(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AppActions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
