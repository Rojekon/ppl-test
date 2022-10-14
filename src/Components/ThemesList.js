import React, { useState } from "react";
import "./componentstyles.css";

function ThemesList({ onChange }) {
  const [themesinfo, setThemesInfo] = useState({
    themes: [],
  });

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { themes } = themesinfo;

    if (checked) {
      setThemesInfo({
        themes: [...themes, value],
      });
    } else {
      setThemesInfo({
        themes: themes.filter((e) => e !== value),
      });
    }
  };
  onChange(themesinfo);

  return (
    <div className="theme-list">
      <h1>Choose your themes:</h1>
      <div>
        <input
          type="checkbox"
          id="1"
          name="themes"
          value="1"
          onChange={handleChange}
        />{" "}
        1. Právní předpisy v oblasti letectví
        <input
          type="checkbox"
          id="2"
          name="themes"
          value="2"
          onChange={handleChange}
        />{" "}
        2. Lidská výkonnost
        <input
          type="checkbox"
          id="3"
          name="themes"
          value="3"
          onChange={handleChange}
        />{" "}
        3. Meteorologie
        <input
          type="checkbox"
          id="4"
          name="themes"
          value="4"
          onChange={handleChange}
        />{" "}
        4. Komunikace
        <input
          type="checkbox"
          id="5"
          name="themes"
          value="5"
          onChange={handleChange}
        />{" "}
        5. Letové zásady
        <input
          type="checkbox"
          id="6"
          name="themes"
          value="6"
          onChange={handleChange}
        />{" "}
        6. Provozní postupy
        <input
          type="checkbox"
          id="7"
          name="themes"
          value="7"
          onChange={handleChange}
        />{" "}
        7. Provedení a plánování letu
        <input
          type="checkbox"
          id="8"
          name="themes"
          value="8"
          onChange={handleChange}
        />{" "}
        8. Obecné znalosti o letadle
        <input
          type="checkbox"
          id="9"
          name="themes"
          value="9"
          onChange={handleChange}
        />{" "}
        9. Navigace
      </div>
    </div>
  );
}

export default ThemesList;
