import React from "react";

function OptionAsk() {
  return (
    <div>
      <h2>Когда будут появляться ответы?</h2>
      <form>
        <p>
          <input type="radio" name="answers" value="afteranswer" checked />
          Сразу после подтверждения ответа
        </p>
        <p>
          <input type="radio" name="answers" value="aftertest" />
          По окончании теста
        </p>
      </form>
      <h2>Формат теста</h2>
      <form>
        <p>
          <input type="radio" name="themes" value="allthemes" checked />
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
