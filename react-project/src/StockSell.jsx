//import { useState, useEffect } from "react";
import "./GamePage.css";

const StockSell = () => {};

export default StockSell;

/*
import { useState } from "react";

const ScaleButtons = () => {
  const [selectedButtons, setSelectedButtons] = useState([]); // Store selected button numbers

  const handleButtonClick = (buttonNumber) => {
    setSelectedButtons((prev) => {
      if (prev.includes(buttonNumber)) {
        // If already selected, remove it
        return prev.filter(num => num !== buttonNumber);
      } else if (prev.length < 2) {
        // If less than 2 are selected, add it
        return [...prev, buttonNumber];
      }
      return prev; // Ignore click if already 2 are selected
    });
  };

  return (
    <div className="scale">
      <div>Stock scale</div>
      <div>Selected: {selectedButtons.join(", ") || "None"}</div>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <button
          key={num}
          className={`scale scale${num} ${selectedButtons.includes(num) ? "selected" : ""}`}
          onClick={() => handleButtonClick(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default ScaleButtons;
*/
