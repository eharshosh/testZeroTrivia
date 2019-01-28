import * as React from "react";


export class SingleQuestion extends React.PureComponent<{question: any}> {
    render() {
        const {text, questionNumber, options} = this.props.question;
        return <div>
            <h3>שאלה מספר {questionNumber}</h3>
            <h4>{text}</h4>
            {shuffleArray(options).map((option, index)=>
                <h5 key={index} style={{fontWeight: option.isCorrect ? 'normal' : 'bold'}}>
                    {index+1}. {option.text}
                </h5>)}
        </div>
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


/*
interface HelloProps { compiler: string; framework: string; }

const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>
 */
