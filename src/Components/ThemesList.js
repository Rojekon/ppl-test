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
        <ul className="checkboxes">
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="1"
              name="themes"
              value="1"
              onChange={handleChange}
            />{" "}
            <label for="1" className="label">
              1. Právní předpisy v oblasti letectví
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="2"
              name="themes"
              value="2"
              onChange={handleChange}
            />{" "}
            <label for="2" className="label">
              2. Lidská výkonnost
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="3"
              name="themes"
              value="3"
              onChange={handleChange}
            />{" "}
            <label for="3" className="label">
              3. Meteorologie
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="4"
              name="themes"
              value="4"
              onChange={handleChange}
            />{" "}
            <label for="4" className="label">
              4. Komunikace
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="5"
              name="themes"
              value="5"
              onChange={handleChange}
            />{" "}
            <label for="5" className="label">
              5. Letové zásady
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="6"
              name="themes"
              value="6"
              onChange={handleChange}
            />{" "}
            <label for="6" className="label">
              6. Provozní postupy
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="7"
              name="themes"
              value="7"
              onChange={handleChange}
            />{" "}
            <label for="7" className="label">
              7. Provedení a plánování letu
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="8"
              name="themes"
              value="8"
              onChange={handleChange}
            />{" "}
            <label for="8" className="label">
              8. Obecné znalosti o letadle
            </label>
          </li>
          <li className="checkbox-group">
            <input
              type="checkbox"
              id="9"
              name="themes"
              value="9"
              onChange={handleChange}
            />{" "}
            <label for="9" className="label">
              9. Navigace
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ThemesList;
