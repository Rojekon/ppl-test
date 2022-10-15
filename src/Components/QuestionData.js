import React, { useState } from "react";
import "./componentstyles.css";

function QuestionData(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isActive, setActive] = useState("false");
  const { array, answers } = props;

  function ToggleClass() {
    setActive(!isActive);
  }

  const afterAnswer = answers;
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
  };

  function newQuestion() {
    const nextQuestion = currentQuestion + 1;
    {
      if (nextQuestion < newArr.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }
  }

  var correctanswer = "answer-default";

  function changeClass(e) {
    if (e === true) {
      correctanswer = "answer-correct";
    } else {
      correctanswer = "answer-incorrect";
    }
    return correctanswer;
  }

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
          {afterAnswer === "afteranswer" ? (
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
                    onClick={() => {
                      handleAnswerOptionClick(answerOption.is_correct);
                      ToggleClass();
                    }}
                    className={
                      isActive
                        ? correctanswer
                        : changeClass(answerOption.is_correct)
                    }
                  >
                    {answerOption.text}
                  </li>
                ))}
                <button
                  onClick={() => {
                    newQuestion();
                    ToggleClass();
                  }}
                >
                  Next
                </button>
              </div>
            </>
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
                    className="answer-default"
                    onClick={() => {
                      handleAnswerOptionClick(answerOption.is_correct);
                      newQuestion();
                    }}
                  >
                    {answerOption.text}
                  </li>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default QuestionData;
