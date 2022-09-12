import React, { useState } from "react";
import Start from "./Components/start";
import OptionAsk from "./Components/OptionAsk";

function App() {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { id: 1, answerText: "New York", isCorrect: false },
        { id: 1, answerText: "London", isCorrect: false },
        { id: 1, answerText: "Paris", isCorrect: true },
        { id: 1, answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { id: 2, answerText: "Jeff Bezos", isCorrect: false },
        { id: 2, answerText: "Elon Musk", isCorrect: true },
        { id: 2, answerText: "Bill Gates", isCorrect: false },
        { id: 2, answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { id: 3, answerText: "Apple", isCorrect: true },
        { id: 3, answerText: "Intel", isCorrect: false },
        { id: 3, answerText: "Amazon", isCorrect: false },
        { id: 3, answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { id: 4, answerText: "1", isCorrect: false },
        { id: 4, answerText: "4", isCorrect: false },
        { id: 4, answerText: "6", isCorrect: false },
        { id: 4, answerText: "7", isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const [showOption, setShowOption] = useState(true);

  function hideOptions() {
    setShowOption(false);
  }

  function hideStart() {
    setShowStart(false);
  }

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    <div className="app">
      {showStart ? (
        <>
          <Start />
          <button onClick={hideStart}>Start</button>
        </>
      ) : (
        <>
          {showOption ? (
            <>
              <OptionAsk />
              <button onClick={hideOptions}>Next</button>
            </>
          ) : (
            <>
              {showScore ? (
                <div className="score-section">
                  <span>
                    You scored {score} out of {questions.length}
                  </span>
                  {questions.map((el) =>
                    el.answerOptions
                      .filter((answer) => answer.isCorrect === true)
                      .map((answer) => (
                        <p>
                          {answer.id}) Correct answer is: {answer.answerText}
                        </p>
                      ))
                  )}
                </div>
              ) : (
                <>
                  <div className="question-section">
                    <div className="question-count">
                      <span>Question {currentQuestion + 1}</span>/
                      {questions.length}
                    </div>
                    <div className="question-text">
                      {questions[currentQuestion].questionText}
                    </div>
                  </div>
                  <div className="answer-section">
                    {questions[currentQuestion].answerOptions.map(
                      (answerOption) => (
                        <button
                          onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                          }
                        >
                          {answerOption.answerText}
                        </button>
                      )
                    )}
                  </div>
                </>
              )}
            </>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default App;
