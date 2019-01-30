import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button } from "semantic-ui-react";
import actions, {AppActions} from "../redux/actions";
import * as selectors from "../redux/selectors";
import * as constants from "../redux/constants";
import QuestionsList from "./QuestionsList";

interface IQuestionsListProps {
    actions: AppActions;
    testState: string;
    correctAnswers: number;
    totalGrade: number;
 }

class Test extends React.PureComponent<IQuestionsListProps> {

    public render() {
        const {testState} = this.props;
        return <div>
            <div className="test-toolbar-container">
                {testState !== constants.TEST_STATE_STARTED &&
                <Button onClick={this.props.actions.beginTest}>התחל מבחן</Button>
                }
                {testState === constants.TEST_STATE_STARTED &&
                <Button onClick={this.props.actions.endTest} className="end-test-button">
                    סיום
                </Button>}
                {testState === constants.TEST_STATE_ENDED &&
                <span className="test-summary">
                  <span>תשובות נכונות: {this.props.correctAnswers}</span>&nbsp;,
                  <span>ציון סופי: {Math.floor(this.props.totalGrade)}</span>
                </span>
                }
            </div>
            {testState === constants.TEST_STATE_STARTED &&
            <QuestionsList/>
            }
        </div>;
    }
}

const mapStateToProps = (state, ownProps) => ({
    correctAnswers: selectors.correctAnswers(state),
    testState: selectors.testState(state),
    totalGrade: selectors.totalGrade(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Test);
