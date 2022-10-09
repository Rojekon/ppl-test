import React, { useState } from "react";

function ThemesList() {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked(!checked);
  }

  return (
    <div>
      <h1>Choose your themes:</h1>
      <div>
        <input
          type="checkbox"
          id="1"
          name="theme"
          value="1"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme one
        <input
          type="checkbox"
          id="2"
          name="theme"
          value="2"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme two
        <input
          type="checkbox"
          id="3"
          name="theme"
          value="3"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme three
        <input
          type="checkbox"
          id="4"
          name="theme"
          value="4"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme four
        <input
          type="checkbox"
          id="5"
          name="theme"
          value="5"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme five
        <input
          type="checkbox"
          id="6"
          name="theme"
          value="6"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme six
        <input
          type="checkbox"
          id="7"
          name="theme"
          value="7"
          checked={checked}
          onChange={handleChange}
        />{" "}
        Theme seven
      </div>
    </div>
  );
}

export default ThemesList;
