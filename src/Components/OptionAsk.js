import React, { useState } from "react";

function OptionAsk({ onChange }) {
  const [answers, setAnswers] = useState("afteranswer");
  const [themes, setThemes] = useState("allthemes");

  function onChangeValueAnswer(event) {
    setAnswers(event.target.value);
    console.log(event.target.value);
  }

  function onChangeValueThemes(event) {
    setThemes(event.target.value);
    onChange(event.target.value);
  }

  return (
    <div className="option-page">
      <h2>Когда будут появляться ответы?</h2>
      <form onChange={onChangeValueAnswer}>
        <p>
          <input
            type="radio"
            name="answers"
            value="afteranswer"
            checked={answers === "afteranswer"}
          />
          Сразу после подтверждения ответа
        </p>
        <p>
          <input type="radio" name="answers" value="aftertest" />
          По окончании теста
        </p>
      </form>
      <h2>Формат теста</h2>
      <form onChange={onChangeValueThemes}>
        <p>
          <input
            type="radio"
            name="themes"
            value="allthemes"
            checked={themes === "allthemes"}
          />
          Все темы
        </p>
        <p>
          <input type="radio" name="themes" value="choosethemes" />
          Выбрать отдельные секции
        </p>
      </form>
    </div>
  );
}

export default OptionAsk;
