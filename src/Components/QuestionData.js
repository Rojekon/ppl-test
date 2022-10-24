import React, { useState, useEffect } from "react";
import "./componentstyles.css";

function QuestionData(props) {
  const [answarr, setAnswarr] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [isActive, setActive] = useState("false");
  const [answer, setAnswer] = useState("");
  const { array, answers } = props;

  const timeArr = array
    .map((nextArr) => {
      return nextArr.time;
    })
    .reduce((el, number) => el + number, 0);

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(timeArr - 1);

  useEffect(() => {
    const id = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setShowScore(true);
        } else {
          setMinutes((m) => m - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(id);
  }, [seconds]);

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

    if (nextQuestion < newArr.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
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

  function onChangeValueAnswer(event) {
    setAnswer(event.target.value);
    setAnswarr([...answarr, event.target.value]);
    if (event.target.value) {
      ToggleClass();
    }
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function questionImage(j) {
    if (j === null) {
      return (
        <img
          src="https://ppl-test-app.herokuapp.com/ppl_api/img?image_path=academy_logo.jpg"
          alt="empty server"
          className="question-image"
        />
      );
    } else {
      return (
        <img
          src={"https://ppl-test-app.herokuapp.com/ppl_api/img?image_path=" + j}
          alt="empty server"
          className="question-image"
        />
      );
    }
  }

  return (
    <>
      {showScore ? (
        <>
          <div className="score-section">
            <span className="score-header">Results</span>
            <span className="score-header">
              You scored: {score} / {newArr.length}
            </span>
            {newArr.map((el, index) =>
              el.answers
                .filter((answer) => answer.is_correct === true)
                .map((answer) => (
                  <>
                    <div className="score-answers">
                      <p>
                        {el.number}) {el.question_text}
                      </p>
                      <p>Correct answer is: {answer.text}</p>
                      <p>Your answer is:{answarr[index]}</p>
                    </div>
                  </>
                ))
            )}
          </div>
          <div className="score-button">
            <button onClick={refreshPage}>Start over!</button>
          </div>
        </>
      ) : (
        <>
          {afterAnswer === "afteranswer" ? (
            <div className="question-section">
              <div className="top-section">
                <div className="button-res">
                  <button onClick={refreshPage} className="restart-button">
                    Restart
                  </button>
                </div>
                <div className="question-count">
                  <span>{currentQuestion + 1}</span>/{newArr.length}
                </div>
                <div className="timer">
                  {minutes}:{seconds < 10 ? "0" + seconds : seconds}
                </div>
              </div>
              <div>{questionImage(newArr[currentQuestion].image)}</div>
              <div className="question-text">
                {newArr[currentQuestion].question_text}
              </div>
              <div className="answer-section">
                {newArr[currentQuestion].answers.map((answerOption) => (
                  <form onChange={onChangeValueAnswer}>
                    <input
                      type="radio"
                      name="answer"
                      value={answerOption.text}
                      checked={answer === answerOption.text}
                      id={answerOption.text}
                    />
                    <label for={answerOption.text}>
                      <li
                        onClick={() => {
                          handleAnswerOptionClick(answerOption.is_correct);
                        }}
                        className={
                          isActive
                            ? correctanswer
                            : changeClass(answerOption.is_correct)
                        }
                      >
                        {answerOption.text}
                      </li>
                    </label>
                  </form>
                ))}
              </div>
              <button
                className="next-button"
                onClick={() => {
                  if (answer === "") {
                    alert("Choose answer.");
                  } else {
                    setAnswer("");
                    newQuestion();
                    ToggleClass();
                  }
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <div>
              <div className="question-section">
                <div className="button-res">
                  <button onClick={refreshPage} className="restart-button">
                    Restart
                  </button>
                </div>
                <div className="question-count">
                  <span>{currentQuestion + 1}</span>/{newArr.length}
                </div>
                <div className="timer">
                  {minutes}:{seconds}
                </div>
                <div>{questionImage(newArr[currentQuestion].image)}</div>
                <div className="question-text">
                  {newArr[currentQuestion].question_text}
                </div>
              </div>
              <div className="answer-section">
                {newArr[currentQuestion].answers.map((answerOption) => (
                  <form onChange={onChangeValueAnswer}>
                    <input
                      type="radio"
                      name="answer"
                      value={answerOption.text}
                      checked={answer === answerOption.text}
                      id={answerOption.text}
                      onClick={newQuestion}
                    />
                    <label for={answerOption.text}>
                      <li
                        className="answer-default"
                        onClick={() => {
                          handleAnswerOptionClick(answerOption.is_correct);
                          newQuestion();
                        }}
                      >
                        {answerOption.text}
                      </li>
                    </label>
                  </form>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default QuestionData;
