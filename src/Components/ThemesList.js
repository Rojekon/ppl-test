import React, { useState } from "react";

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
    <div>
      <h1>Choose your themes:</h1>
      <div>
        <input
          type="checkbox"
          id="1"
          name="themes"
          value="1"
          onChange={handleChange}
        />{" "}
        Theme one
        <input
          type="checkbox"
          id="2"
          name="themes"
          value="2"
          onChange={handleChange}
        />{" "}
        Theme two
        <input
          type="checkbox"
          id="3"
          name="themes"
          value="3"
          onChange={handleChange}
        />{" "}
        Theme three
        <input
          type="checkbox"
          id="4"
          name="themes"
          value="4"
          onChange={handleChange}
        />{" "}
        Theme four
        <input
          type="checkbox"
          id="5"
          name="themes"
          value="5"
          onChange={handleChange}
        />{" "}
        Theme five
        <input
          type="checkbox"
          id="6"
          name="themes"
          value="6"
          onChange={handleChange}
        />{" "}
        Theme six
        <input
          type="checkbox"
          id="7"
          name="themes"
          value="7"
          onChange={handleChange}
        />{" "}
        Theme seven
      </div>
    </div>
  );
}

export default ThemesList;
