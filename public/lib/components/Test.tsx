import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "semantic-ui-react";
import actions from "../redux/actions";
import * as selectors from "../redux/selectors";
import QuestionsList from "./QuestionsList";

interface IQuestionsListProps {
    actions: { beginTest: () => void };
    testStarted: boolean;
    correctAnswers: number;
    totalGrade: number;
 }

class Test extends React.PureComponent<IQuestionsListProps> {

    public render() {
        return <div>
        {this.props.correctAnswers && <p>תשובות נכונות: {this.props.correctAnswers}</p>}
        {this.props.totalGrade && <p>ציון סופי: {Math.floor(this.props.totalGrade)}</p>}
        {!this.props.testStarted && <Button onClick={this.props.actions.beginTest}>התחל מבחן</Button>}
        {this.props.testStarted && <QuestionsList />}
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => ({
    correctAnswers: selectors.correctAnswers(state),
    testStarted: selectors.testStarted(state),
    totalGrade: selectors.totalGrade(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Test);
