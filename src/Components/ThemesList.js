import React from "react";

function ThemesList() {
  return (
    <div>
      <h1>Choose your themes:</h1>
      <div>
        <input type="checkbox" id="1" name="theme" value="1" /> Theme one
        <input type="checkbox" id="2" name="theme" value="2" /> Theme two
        <input type="checkbox" id="3" name="theme" value="3" /> Theme three
        <input type="checkbox" id="4" name="theme" value="4" /> Theme four
        <input type="checkbox" id="5" name="theme" value="5" /> Theme five
        <input type="checkbox" id="6" name="theme" value="6" /> Theme six
        <input type="checkbox" id="7" name="theme" value="7" /> Theme seven
      </div>
    </div>
  );
}

export default ThemesList;
