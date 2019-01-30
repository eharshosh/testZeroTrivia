import * as React from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";
import * as selectors from "../redux/selectors";
import "../styles.less";
import Test from "./Test";
import TestUploadForm from "./TestUploadForm";
import * as constants from '../redux/constants';

interface IAppProps {
    questionsFetched: boolean;
    uploadingFile: boolean;
    testState: string;
 }

class App extends React.PureComponent<IAppProps> {
    public render() {
        if (this.props.uploadingFile) {
            return <Loader active={true} as="div" size="huge" />;
        }
        const showTestUploadForm = !this.props.questionsFetched
            || this.props.testState === constants.TEST_STATE_ENDED;
        return (
            <div className="main-container">
                <div>
                    {this.props.questionsFetched && <Test />}
                    {showTestUploadForm && <TestUploadForm />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    questionsFetched: selectors.questionsFetched(state),
    uploadingFile: selectors.uploadingFile(state),
    testState: selectors.testState(state),
});

export default connect(mapStateToProps)(App);
