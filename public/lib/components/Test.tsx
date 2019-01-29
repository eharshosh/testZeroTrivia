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
 }

class Test extends React.PureComponent<IQuestionsListProps> {

    public render() {
        if (!this.props.testStarted) {
            return(<Button onClick={this.props.actions.beginTest}>
                    התחל מבחן
                </Button>);
        }
        return <QuestionsList />;
    }
}

const mapStateToProps = (state, ownProps) => ({
    testStarted: selectors.testStarted(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Test);
