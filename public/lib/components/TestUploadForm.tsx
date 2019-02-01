import * as React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import classNames from 'classnames'
import DropZone from 'react-dropzone'
import * as selectors from "../redux/selectors";
import appActions, {AppActions} from "../redux/actions";

interface ITestUploadFormProps {
    actions: AppActions;
}

class TestUploadForm extends React.PureComponent<ITestUploadFormProps> {

    onDrop = (acceptedFiles: File[], rejectedFiles: File[]) => {
        let file = acceptedFiles[0];
        if (file) {
            this.props.actions.fetchQuestions(file);
        } else {
            file = rejectedFiles[0];
            if (file) {                
                if (file.size < 50*1024*1024 && file.type == "") { // work-around android upload bug
                    this.props.actions.fetchQuestions(file);
                } else {
                    this.props.actions.fetchQuestionsError("File not supported");
                }
            }
        }
    };

    render() {
        return (
            <DropZone onDrop={this.onDrop} accept={"application/pdf"} >
                {({getRootProps, getInputProps, isDragActive}) => {
                    return (
                        <div
                            {...getRootProps()}
                            className={classNames('dropzone', {'is-active': isDragActive})}
                        >
                            <input {...getInputProps()} />
                            {
                                isDragActive ?
                                    <p>...השלך את הקובץ פה</p> :
                                    <p>גררי קבצים לפה או לחצי כאן ע"מ לבחור קובץ</p>
                            }
                        </div>
                    )
                }}
            </DropZone>
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
export default connect(mapStateToProps, mapDispatchToProps)(TestUploadForm);
