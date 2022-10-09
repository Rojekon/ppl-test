import React, { useState } from "react";

function QuestionData(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const { array } = props;

  const test = array.map((nextArr) => {
    return nextArr.questions;
  });

  let newArr = [];

  for (let i = 0; i < test.length; i++) {
    newArr.push(...test[i]);
  }

  const handleAnswerOptionClick = (is_correct) => {
    if (is_correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    {
      if (nextQuestion < newArr.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }
  };

  return (
    <>
      {showScore ? (
        <div className="score-section">
          <span>
            You scored {score} out of {newArr.length}
          </span>
          {newArr.map((el) =>
            el.answers
              .filter((answer) => answer.is_correct === true)
              .map((answer) => (
                <div>
                  <p>
                    {el.number}) {el.question_text}
                  </p>
                  <p>Correct answer is: {answer.text}</p>
                </div>
              ))
          )}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{newArr.length}
            </div>
            <div className="question-text">
              {newArr[currentQuestion].question_text}
            </div>
          </div>
          <div className="answer-section">
            {newArr[currentQuestion].answers.map((answerOption) => (
              <li
                onClick={() => handleAnswerOptionClick(answerOption.is_correct)}
              >
                {answerOption.text}
              </li>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default QuestionData;
