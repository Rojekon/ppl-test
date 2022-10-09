import React, { useState, useEffect } from "react";
import Start from "./Components/start";
import OptionAsk from "./Components/OptionAsk";
import QuestionData from "./Components/QuestionData";
import ThemesList from "./Components/ThemesList";
import axios from "axios";

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showOption, setShowOption] = useState(true);
  const [showThemeList, setShowThemeList] = useState(true);
  const [isShownList, setIsShownList] = useState(false);
  const [themes, setThemes] = useState("");
  const [themesinfo, setThemesInfo] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    let userThemes = themesinfo;
    let url = "https://ppl-test-app.herokuapp.com/ppl_api/?";

    for (let i = 0; i < userThemes.length; i++) {
      url += "topics=" + userThemes[i] + "&";
    }

    const topics = url.slice(0, -1);
    console.log(topics);

    const getData = async () => {
      const res = await axios.get(topics).catch((error) => {
        console.error(error);
      });
      setArray(res.data);
    };

    getData();
  }, []);

  function onChangeValueThemes(themes) {
    setThemes(themes);
    console.log(themes);
  }

  function handleChange(themesinfo) {
    setThemesInfo(themesinfo);
    console.log(themesinfo);
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
              <OptionAsk onChange={onChangeValueThemes} />
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
                  <button onClick={hideThemeList}>Submit</button>
                </div>
              ) : (
                <QuestionData array={array} />
              )}
            </>
          )}{" "}
        </>
      )}
    </div>
  );
}

export default App;
