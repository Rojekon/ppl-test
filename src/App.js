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
  const [showReady, setShowReady] = useState(true);
  const [themes, setThemes] = useState("allthemes");
  const [answers, setAnswers] = useState("afteranswer");
  const [themesinfo, setThemesInfo] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const newArr = Object.values(themesinfo).flat();
    let userThemes = newArr;
    let url = "https://ppl-test-app.herokuapp.com/ppl_api/?";
    if (themesinfo.length === 0) {
      userThemes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

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

  useEffect(() => {
    const getStart = async () => {
      await axios
        .get("https://ppl-test-app.herokuapp.com/ppl_api/logs?events=start")
        .catch((error) => {
          console.error(error);
        });
    };
    if (showReady === false) {
      getStart();
    }
  }, [showReady]);

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

  function hideReady() {
    setShowReady(false);
  }

  const time = array
    .map((nextArr) => {
      return nextArr.time;
    })
    .reduce((el, number) => el + number, 0);

  return (
    <>
      <div className="app">
        {showStart ? (
          <div className="start">
            <Start />
            <button className="start-button" onClick={hideStart}>
              Spustit test
            </button>
          </div>
        ) : (
          <>
            {showOption ? (
              <div className="option">
                <OptionAsk
                  onChangeAnswer={(answers) => {
                    setAnswers(answers);
                  }}
                  onChangeThemes={(themes) => {
                    setThemes(themes);
                  }}
                />
                <button
                  onClick={() => {
                    if (themes === "choosethemes") {
                      hideOptions();
                      handleClick();
                    } else {
                      hideOptions();
                      hideThemeList();
                    }
                  }}
                >
                  Další
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
                        }
                      }}
                    >
                      Potvrdit
                    </button>
                  </div>
                ) : (
                  <>
                    {showReady ? (
                      <div className="ready-window">
                        Test bude trvat {time} minut. Správné odpovědi se
                        zobrazí{" "}
                        {answers === "afteranswer"
                          ? "hned po odpovědi"
                          : "po testu"}
                        . Hodně štěstí!!
                        <div className="ready-button">
                          <button onClick={hideReady}>Spustit</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <QuestionData array={array} answers={answers} />
                      </>
                    )}
                  </>
                )}
              </>
            )}{" "}
          </>
        )}
      </div>
      <div className="info-names">
        Made by{" "}
        <a href="https://www.linkedin.com/in/nikita-k-520915193">
          Nikita Korepanov
        </a>{" "}
        &{" "}
        <a href="https://www.linkedin.com/in/rodion-babkin-85409a233">
          Rodion Babkin
        </a>
        <p>Have questions? Text us: krpnv.nv@gmail.com</p>
      </div>
    </>
  );
}

export default App;
