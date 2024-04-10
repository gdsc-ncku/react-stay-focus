import React, { useState, useEffect } from 'react';

const QuestionUnlock = ({ lockSettings }) => {
    const [answer, setAnswer] = useState("");
    const [questions] = useState([
        {text: "How many months do we have in a year? (the number only)", answer: "12"},
        {text: "How many days do we have in a week? (the number only)", answer: "7"},
        {text: "How many days are there in a year? (the number only)", answer: "365"},
        {text: "How many colors are there in a rainbow?", answer: "7"},
        {text: "How many sides does a triangle have?(the number only)", answer: "3"},
        {text: "What is 2+2?", answer: "4"},
        {text: "What is 10+15?", answer: "25"},
        {text: "What is 10 x 9?", answer: "90"},
        {text: "What is 1+1+1+1+1+1?", answer: "6"},
        {text: "What is 2x2 + 1?", answer: "5"},
        {text: "What is 123 - 33?", answer: "90"},
        {text: "What is 10 x (5-3)?", answer: "20"},
        {text: "What is 350 * 0?", answer: "0"},
        {text: "What is the capital of Italy", answer: "Rome"},
        {text: "What is the capital of France", answer: "Paris"},
        {text: "What is the capital of Egypt", answer: "Cairo"},
        {text: "What is the capital of Spain", answer: "Madrid"},
        {text: "What is the capital of Japan", answer: "Tokyo"},
        {text: "What is the capital of Belgium", answer: "Brussels"},
        {text: "What is the capital of Sweden", answer: "Stockholm"},
        {text: "Rome is the capital of?", answer: "Italy"},
        {text: "Paris is the capital of?", answer: "France"},
        {text: "Cairo is the capital of?", answer: "Egypt"},
        {text: "Madrid is the capital of?", answer: "Spain"},
        {text: "Tokyo is the capital of?", answer: "Japan"},
        {text: "Brussels is the capital of?", answer: "Belgium"},
        {text: "Stockholm is the capital of?", answer: "Sweden"},
        {text: "When did World War I start", answer: "1914"},
        {text: "When did World War I finish", answer: "1918"},
        {text: "When did World War II start", answer: "1939"},
        {text: "When did World War II start", answer: "1945"},
    ]);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [numberOfTries, setNumberOfTries] = useState(0);

    useEffect(() => {
        setSelectedQuestionIndex(Math.floor(Math.random() * questions.length));
    }, [questions]);

    const handleUnlock = () => {
        if (answer.toLowerCase().includes(questions[selectedQuestionIndex].answer.toLowerCase())) {
            // handle unlocking
        } else {
            setNumberOfTries(prevTries => prevTries + 1);
            setShowErrorMessage(true);
        }
    };

    const showAnswer = () => {
        setAnswer(questions[selectedQuestionIndex].answer);
    };

    const randomQuestion = questions[selectedQuestionIndex];

    return (
        <div>
            <h3>{randomQuestion.text}</h3>
            <div>
                <label>Answer</label>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') handleUnlock();
                    }}
                />
            </div>
            {showErrorMessage && (
                <div>
                    <span>Wrong answer!</span>
                    {numberOfTries >= lockSettings.questionNumberOfTries && (
                        <button onClick={showAnswer}>Show answer</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuestionUnlock;
