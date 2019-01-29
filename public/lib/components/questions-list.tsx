import * as React from "react";
import { SingleQuestion } from "./single-question";

export class QuestionsList extends React.PureComponent {
    state = { questions: null };

    async componentWillMount(): Promise<void> {
        const response = await fetch('/questions');
        const questions = await response.json();
        this.setState({ questions });
    }

    render() {
        if (!this.state.questions) {
            return null;
        }
        return this.state.questions.map((question, index) =>
            <SingleQuestion key={index} question={question} />);
    }
}

/*
interface HelloProps { compiler: string; framework: string; }

const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>
 */
