import {List, Map} from "immutable";
import * as React from "react";
import { connect } from "react-redux";
import { IQuestion } from "../../../lib/models/IQuestion";
import * as actions from "../redux/actions";
import * as constants from "../redux/constants";
import * as selectors from "../redux/selectors";
import { SingleQuestion } from "./SingleQuestion";

interface IAppProps {
    questions: List<IQuestion>;
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
        return this.props.questions.map((question, index) =>
        <SingleQuestion
            key={index}
            question={question}
        />);
    }
}

const mapStateToProps = (state, ownProps) => ({
    questions: selectors.getQuestionsList(state),
    questionsFetched: selectors.questionsFetched(state),
});

const mapDispatchToProps = { ...actions };

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default connectToStore(App);
