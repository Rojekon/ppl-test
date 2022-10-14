import React, { useState, useEffect } from "react";
import Start from "./Components/start";
import OptionAsk from "./Components/OptionAsk";
import QuestionData from "./Components/QuestionData";
import ThemesList from "./Components/ThemesList";
import axios from "axios";
import "./index.css";

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showOption, setShowOption] = useState(true);
  const [showThemeList, setShowThemeList] = useState(true);
  const [isShownList, setIsShownList] = useState(false);
  const [themes, setThemes] = useState("allthemes");
  const [answers, setAnswers] = useState("afteranswer");
  const [themesinfo, setThemesInfo] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const newArr = Object.values(themesinfo).flat();
    let userThemes = newArr;
    let url = "https://ppl-test-app.herokuapp.com/ppl_api/?";
    console.log(userThemes);

    for (let i = 0; i < userThemes.length; i++) {
      url += "topics=" + userThemes[i] + "&";
    }

    const topics = url.slice(0, -1);

    const getData = async () => {
      const res = await axios.get(topics).catch((error) => {
        console.error(error);
      });
      setArray(res.data);
    };

    getData();
  }, [themesinfo]);

  function handleChange(themesinfo) {
    setThemesInfo(themesinfo);
  }

  function handleClick() {
    setIsShownList(true);
  }

  function hideOptions() {
    setShowOption(false);
  }

  function hideStart() {
    setShowStart(false);
  }

  function hideThemeList() {
    setShowThemeList(false);
  }

  return (
    <div className="app">
      {showStart ? (
        <div className="start">
          <Start />
          <button onClick={hideStart}>Start</button>
        </div>
      ) : (
        <>
          {showOption ? (
            <div className="option">
              <OptionAsk
                onChangeAnswer={(answers) => {
                  setAnswers(answers);
                  console.log(answers);
                }}
                onChangeThemes={(themes) => {
                  setThemes(themes);
                  console.log(themes);
                }}
              />
              <button
                onClick={() => {
                  if (themes === "choosethemes") {
                    hideOptions();
                    handleClick();
                  } else {
                    hideOptions();
                  }
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <>
              {showThemeList ? (
                <div className="themes">
                  {isShownList && <ThemesList onChange={handleChange} />}
                  <button
                    onClick={() => {
                      if (array.length === 0) {
                        alert("Please, select some topics.");
                      } else {
                        hideThemeList();
                        console.log(array);
                        console.log(answers);
                      }
                    }}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <>
                  <QuestionData array={array} answers={answers} />
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
