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
  const [array, setArray] = useState([]);
  const [themes, setThemes] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios
        .get("https://ppl-test-app.herokuapp.com/ppl_api", {
          params: {
            topics: 1,
          },
        })
        .catch((error) => {
          console.error(error);
        });
      setArray(res.data);
      console.log(res.data);
    };

    getData();
  }, []);

  function onChangeValueThemes(themes) {
    setThemes(themes);
    console.log(themes);
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
                  {isShownList && <ThemesList />}
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
