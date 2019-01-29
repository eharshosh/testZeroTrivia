import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "semantic-ui-react";
import * as actions from "../redux/actions";
import * as selectors from "../redux/selectors";
import QuestionsList from "./QuestionsList";

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
        if (!this.props.questionsFetched) {
            return <Loader active={true} as="div" size="huge" />;
        }
        return <QuestionsList />;
    }
}

const mapStateToProps = (state, ownProps) => ({
    questionsFetched: selectors.questionsFetched(state),
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...actions}, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
