import React, { useState } from "react";
import "./componentstyles.css";

function OptionAsk({ onChangeAnswer, onChangeThemes }) {
  const [answers, setAnswers] = useState("afteranswer");
  const [themes, setThemes] = useState("allthemes");

  function onChangeValueAnswer(event) {
    setAnswers(event.target.value);
    onChangeAnswer(event.target.value);
  }

  function onChangeValueThemes(event) {
    setThemes(event.target.value);
    onChangeThemes(event.target.value);
  }

  return (
    <div className="option-page">
      <h2>Zobrazení správných odpovědí</h2>
      <form onChange={onChangeValueAnswer}>
        <p className="option-1">
          <input
            className="radio"
            type="radio"
            name="answers"
            value="afteranswer"
            checked={answers === "afteranswer"}
            id="1"
          />
          <label for="1">
            <span className="radio-custom-button"></span>
            Po ukončení otázky
          </label>
        </p>
        <p className="option-1">
          <input
            className="radio"
            type="radio"
            name="answers"
            value="aftertest"
            id="2"
          />
          <label for="2">
            <span className="radio-custom-button"></span>
            Po ukončení testu
          </label>
        </p>
      </form>
      <h2>Testovací formát</h2>
      <form onChange={onChangeValueThemes}>
        <p className="option-2">
          <input
            className="radio"
            type="radio"
            name="themes"
            value="allthemes"
            checked={themes === "allthemes"}
            id="3"
          />
          <label for="3">
            <span className="radio-custom-button"></span>
            Všechna témata
          </label>
        </p>
        <p className="option-2">
          <input
            className="radio"
            type="radio"
            name="themes"
            value="choosethemes"
            id="4"
          />
          <label for="4">
            <span className="radio-custom-button"></span>
            Vybraná témata
          </label>
        </p>
      </form>
    </div>
  );
}

export default OptionAsk;
