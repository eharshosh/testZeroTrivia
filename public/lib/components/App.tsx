import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "semantic-ui-react";
import actions from "../redux/actions";
import * as selectors from "../redux/selectors";
import "../styles.less";
import Test from "./Test";

interface IAppProps {
    actions: { fetchQuestions: () => void };
    questionsFetched: boolean;
 }

class App extends React.PureComponent<IAppProps> {

    public componentWillMount() {
        if (!this.props.questionsFetched) {
            this.props.actions.fetchQuestions();
        }
    }

    public render() {
        return (
            <div className="mainContainer">
                {this.props.questionsFetched ? <Test /> : <Loader active={true} as="div" size="huge" />}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    questionsFetched: selectors.questionsFetched(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
