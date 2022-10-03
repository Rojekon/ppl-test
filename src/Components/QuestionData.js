import React, { useState } from "react";

function QuestionData(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const { array } = props;

  const handleAnswerOptionClick = (is_correct) => {
    if (is_correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    {
      array.map((elements) => {
        if (nextQuestion < elements.questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
        }
      });
    }
  };

  return (
    <>
      {array.map((elements) => (
        <>
          {showScore ? (
            <div className="score-section">
              <span>
                You scored {score} out of {elements.questions.length}
              </span>
              {elements.questions.map((el) =>
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
                  <span>Question {currentQuestion + 1}</span>/
                  {elements.questions.length}
                </div>
                <div className="question-text">
                  {elements.questions[currentQuestion].question_text}
                </div>
              </div>
              <div className="answer-section">
                {elements.questions[currentQuestion].answers.map(
                  (answerOption) => (
                    <li
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.is_correct)
                      }
                    >
                      {answerOption.text}
                    </li>
                  )
                )}
              </div>
            </>
          )}
        </>
      ))}
    </>
  );
}

export default QuestionData;
