import React, { Component } from 'react';

class QuestionUnlock extends Component {
    constructor(props) {
        super(props);
        const questions = [
            //ref: https://www.momjunction.com/articles/general-knowledge-questions-for-kids_00439953/
            {text: "How many months do we have in a year? (the number only)", answer: "12"},
            {text: "How many days do we have in a week? (the number only)", answer: "7"},
            {text: "How many days are there in a year? (the number only)", answer: "365"},
            {text: "How many colors are there in a rainbow?", answer: "7"},
            {text: "How many sides does a triangle have?(the number only)", answer: "3"},

            //math questions
            {text: "What is 2+2?", answer: "4"},
            {text: "What is 10+15?", answer: "25"},
            {text: "What is 10 x 9?", answer: "90"},
            {text: "What is 1+1+1+1+1+1?", answer: "6"},
            {text: "What is 2x2 + 1?", answer: "5"},
            {text: "What is 123 - 33?", answer: "90"},
            {text: "What is 10 x (5-3)?", answer: "20"},
            {text: "What is 350 * 0?", answer: "0"},

            //capital questions
            {text: "What is the capital of Italy", answer: "Rome"},
            {text: "What is the capital of France", answer: "Paris"},
            {text: "What is the capital of Egypt", answer: "Cairo"},
            {text: "What is the capital of Spain", answer: "Madrid"},
            {text: "What is the capital of Japan", answer: "Tokyo"},
            {text: "What is the capital of Belgium", answer: "Brussels"},
            {text: "What is the capital of Sweden", answer: "Stockholm"},


            //inverse capital questions
            {text: "Rome is the capital of?", answer: "Italy"},
            {text: "Paris is the capital of?", answer: "France"},
            {text: "Cairo is the capital of?", answer: "Egypt"},
            {text: "Madrid is the capital of?", answer: "Spain"},
            {text: "Tokyo is the capital of?", answer: "Japan"},
            {text: "Brussels is the capital of?", answer: "Belgium"},
            {text: "Stockholm is the capital of?", answer: "Sweden"},

            //history questions
            {text: "When did World War I start", answer: "1914"},
            {text: "When did World War I finish", answer: "1918"},
            {text: "When did World War II start", answer: "1939"},
            {text: "When did World War II start", answer: "1945"},


        ]
        this.state = {
            answer: "",
            questions: questions,
            selectedQuestionIndex: Math.floor(Math.random() * questions.length),
            showErrorMessage: false,
            numberOfTries: 0,
        };
    }

    handleUnlock = () => {
        if (this.state.answer.toLowerCase().includes(this.state.questions[this.state.selectedQuestionIndex].answer.toLowerCase())) {
            this.props.handleUnlock();
        } else {
            this.setState(prevState => ({
                numberOfTries: prevState.numberOfTries + 1,
                showErrorMessage: true
            }));
        }
    };

    showAnswer = () => {
        this.setState(prevState => ({
            answer: prevState.questions[prevState.selectedQuestionIndex].answer
        }));
    };

    render() {
        return (
            <div>
                <h3>{this.state.questions[this.state.selectedQuestionIndex].text}</h3>
                <input type="text" value={this.state.answer} onChange={e => this.setState({ answer: e.target.value })} onKeyUp={e => e.key === 'Enter' && this.handleUnlock()} />
                {this.state.showErrorMessage && <div>Wrong answer!</div>}
                {this.state.numberOfTries >= this.props.lockSettings.questionNumberOfTries && <button onClick={this.showAnswer}>Show answer</button>}
            </div>
        );
    }
}

export default QuestionUnlock;