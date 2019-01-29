import {Record} from "immutable";
import * as React from "react";
import { IQuestion } from "../../../lib/models/IQuestion";
export class SingleQuestion extends React.PureComponent<{ question: Record<IQuestion> }> {
    public render() {
        const { text, questionNumber, options } = this.props.question.toJS();
        const shuffledOptions = shuffleArray(options);
        return <div>
            <h3>שאלה מספר {questionNumber}</h3>
            <h4>{text}</h4>
            {shuffledOptions.map(this.renderQuestion)}
        </div>;
    }

    private renderQuestion(option, index) {
        return (
        <h5 key={index} style={{ fontWeight: option.isCorrect ? "normal" : "bold" }}>
            {index + 1}. {option.text}
        </h5>);
    }
}

function shuffleArray(src) {
    const result = [...src];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}
