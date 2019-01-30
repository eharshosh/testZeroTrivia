import {List, Map, Record} from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IQuestion } from "../../../lib/models/IQuestion";
import appActions, {AppActions} from "../redux/actions";
import * as selectors from "../redux/selectors";
import "../styles.less";
import { SingleQuestion } from "./SingleQuestion";

interface IQuestionsListProps {
    actions: AppActions;
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
                        onToggleQuestionExclusion={()=> this.props.actions.toggleQuestionExclusion(questionIndex)}                        
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
    actions: bindActionCreators({...appActions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
