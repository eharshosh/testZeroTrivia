import classNames from "classnames";
import {Record} from "immutable";
import * as React from "react";
import { Button } from "semantic-ui-react";
import { IQuestion } from "../../../lib/models/IQuestion";
import * as contants from '../redux/constants';

interface ISingleQuestionProps {
    question: Record<IQuestion>;
    selectedAnswer: number;
    onSelectAnswer: (answerIndex: number) => void;
    onToggleQuestionExclusion: () => void;
}

interface ISingleQuestionState {
    showCorrectAnswer: boolean;
    testCurrentAnswer: boolean;
}

export class SingleQuestion extends React.PureComponent<ISingleQuestionProps, ISingleQuestionState> {

    constructor(props) {
        super  (props);
        this.state = {
            showCorrectAnswer: false,
            testCurrentAnswer: false,
        };
    }

    public componentWillReceiveProps(nextProps: Readonly<ISingleQuestionProps>, nextContext: any) {
        if (nextProps.question !== this.props.question
            || nextProps.selectedAnswer !== this.props.selectedAnswer) {
            this.setState({
                showCorrectAnswer: false,
                testCurrentAnswer: false,
            });
        }
    }

    public render() {
        const { text, questionNumber, options, excluded } = this.props.question.toJS();
        return <div className="single-question">
            <h3>שאלה מספר {questionNumber}</h3>
            <h4>{text}</h4>
            <div className="answers">
                {options.map((option, index) => this.renderAnswer(option, index))}
            </div>
            <div className="buttons">
                <Button disabled={isNaN(this.props.selectedAnswer)} onClick={this.onTestAnswer}>
                    בדיקה
                </Button>
                <Button onClick={this.onShowCorrectAnswer}>
                    הצג תשובה נכונה
                </Button>
                <Button onClick={this.props.onToggleQuestionExclusion} alt="אל תתיחס אל קיומה של שאלה זו בעת חישוב הציון">
                    {excluded ? "אל תתעלם משאלה זו" : "התעלם משאלה זו"}
                </Button>
            </div>
        </div>;
    }

    private onTestAnswer = () => {
        this.setState({ testCurrentAnswer: true });
    }

    private onShowCorrectAnswer = () => {
        this.setState({ showCorrectAnswer: true });
    }
    
    private renderAnswer(option, index) {
        const isSelected  = this.props.selectedAnswer === index;
        const classes = classNames(["answer"], {
            correct: option.isCorrect &&
                (this.state.showCorrectAnswer || (this.state.testCurrentAnswer && isSelected)),
            selected: isSelected,
            wrong: this.state.testCurrentAnswer && !option.isCorrect && isSelected,
        });
        const onClick = () => this.props.onSelectAnswer(index);
        return (
            <div key={index} className={classes} onClick={onClick}>
                {index + 1}) {option.text}
            </div>
        );
    }
}
