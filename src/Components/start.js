import React from "react";

function Start() {
  return (
    <div>
      <p className="test-name">Praktický test ke zkouškám z teorie PPL/LAPL</p>
      <div className="information">
        <p>
          Vítáme vás v naší aplikaci pro přípravu na zkoušky PPL/LAPL.
        </p>
        <p>
          Dotazy vám budou kladeny z oficiálního zdroje: s využitím databáze zkušebních otázek firmy Aircademy GmbH.
        </p>
        <p>
          Z české verze této databáze je přibližně 75 % otázek zveřejněno zde,
          zbytek je důvěrný. Ve stejném poměru, tj. 75 % ku 25 %, jsou i otázky
          obsažené ve zkušebních testech zkoušek z teoretických znalostí PPL a
          LAPL.
        </p>
        <p>
          Ke každé zveřejněné otázce jsou navrženy 4 odpovědi, z nichž jen jedna
          je správná. Můžete absolvovat celý test nebo procvičit jednotlivá témata.
        </p>
      </div>
    </div>
  );
}

export default Start;
