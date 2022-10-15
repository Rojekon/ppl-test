import React from "react";

function Start() {
  return (
    <div>
      <p className="test-name">PPL zkusebni test</p>
      <div className="information">
        <p>
          Мы рады приветствовать вас в нашем приложении по подготовке к экзамену
          PPL.
        </p>
        <p>
          Вам будут предложены вопросы из офицального источника. Вы можете
          выбрать: пройти тест целиком или потренировать отдельные секции.
        </p>
        <p>
          Z české verze této databáze je přibližně 75 % otázek zveřejněno zde,
          zbytek je důvěrný. Ve stejném poměru, tj. 75 % ku 25 %, jsou i otázky
          obsažené ve zkušebních testech zkoušek z teoretických znalostí PPL a
          LAPL (A/H).
        </p>
        <p>
          Ke každé zveřejněné otázce jsou navrženy 4 odpovědi, z nichž jen jedna
          je správná. Ta je označena zatržením.
        </p>
      </div>
    </div>
  );
}

export default Start;
