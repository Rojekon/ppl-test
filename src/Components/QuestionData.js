import React, { useState, useEffect } from "react";
import axios from "axios";
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
  }, [seconds, minutes]);

  function ToggleClass() {
    setActive(!isActive);
  }

  useEffect(() => {
    const getFinish = async () => {
      await axios
        .get("https://ppl-test-app.herokuapp.com/ppl_api/logs?events=finished")
        .catch((error) => {
          console.error(error);
        });
    };
    if (showScore === true) {
      getFinish();
    }
  }, [showScore]);

  const getRestart = async () => {
    await axios
      .get("https://ppl-test-app.herokuapp.com/ppl_api/logs?events=start_over")
      .catch((error) => {
        console.error(error);
      });
  };

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
    setTimeout(window.location.reload(false), 3000);
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

  function userAnswer(t, u) {
    if (t === u) {
      return <p style={{ color: "#33e833" }}>Va??e odpov???? je: {u}</p>;
    } else {
      return <p style={{ color: "#eb0000" }}>Va??e odpov???? je: {u}</p>;
    }
  }
  return (
    <>
      {showScore ? (
        <>
          <div className="score-section">
            <span className="score-header">V??sledek</span>
            <span className="score-header">
              Z??skali jste: {score} / {newArr.length}
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
                      <p>
                        Va??e odpov???? je: Spr??vn?? odpov???? je:{" "}
                        <span style={{ color: "#16c5ec" }}>{answer.text}</span>
                      </p>
                      {userAnswer(answer.text, answarr[index])}
                    </div>
                  </>
                ))
            )}
          </div>
          <div className="score-button">
            <button
              onClick={() => {
                getRestart();
                refreshPage();
              }}
            >
              Za????t znovu!
            </button>
          </div>
        </>
      ) : (
        <>
          {afterAnswer === "afteranswer" ? (
            <div className="question-section">
              <div className="top-section">
                <div className="button-res">
                  <button
                    onClick={() => {
                      getRestart();
                      refreshPage();
                    }}
                    className="restart-button"
                  >
                    Restartovat
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
                Dal????
              </button>
            </div>
          ) : (
            <div>
              <div className="question-section">
                <div className="button-res">
                  <button
                    onClick={() => {
                      getRestart();
                      refreshPage();
                    }}
                    className="restart-button"
                  >
                    Restartovat
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
