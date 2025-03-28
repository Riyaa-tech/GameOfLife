import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import arrow from "./Images/arrow.png";
import wheel from "./Images/wheel.png";
import "./GamePage.css";

const Wheel = ({
  count,
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  setLoc1,
  setLoc2,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [stepValue, setStepValue] = useState(0);
  const [status, setStatus] = useState(true);

  const navigate = useNavigate();

  const resetAll = () => {
    setPlayer1((prev) => ({ ...prev, isActive: !player1.isActive }));
    setPlayer2((prev) => ({ ...prev, isActive: !player2.isActive }));
  };

  const handleClick = () => {
    if (count === 0) {
      alert(`Choose professions before starting the game!`);
      return;
    }

    if (status && stepValue >= 0) {
      setPosition({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
      });
    } else {
      setPosition({ x: 0, y: 0 });
      const stepsValue = getSteps();
      setStepValue(stepsValue);
      updateLocation(stepsValue);
      resetAll();
    }
    setStatus(!status);
  };

  const getAngle = (x, y) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const angle = getAngle(position.x, position.y);

  const getSteps = () => {
    if (angle > 30 && angle <= 90) return 6;
    else if (angle > 90 && angle <= 150) return 5;
    else if (angle > 150 && angle <= 210) return 4;
    else if (angle > 210 && angle <= 270) return 3;
    else if (angle > 270 && angle <= 330) return 2;
    else return 1;
  };

  const updateLocation = (stepValue) => {
    if (player1.isActive) {
      setLoc1((prevLoc) => {
        const newLoc = Math.min(prevLoc + stepValue, 37);
        return newLoc;
      });
    } else {
      setLoc2((prevLoc) => {
        const newLoc = Math.min(prevLoc + stepValue, 37);
        return newLoc;
      });
    }

    if (loc1 == 37 && loc2 == 37) {
      let message;
      if (player1.amount > player2.amount) {
        message = `🏆 Winner: ${player1.name}!`;
      } else if (player1.amount < player2.amount) {
        message = `🏆 Winner: ${player2.name}!`;
      } else {
        message = "🤝 It's a tie!";
      }
      alert(message);
      navigate("/");
    }

    const activeKeyNext = player1.isActive
      ? loc1 + stepValue
      : loc2 + stepValue;

    const query1 = `.cell-${activeKeyNext}`;
    const parentElement1 = document.querySelector(query1);

    if (parentElement1) {
      parentElement1.style.borderColor = player1.isActive ? "black" : "blue";
      parentElement1.style.borderWidth = "3px";
      parentElement1.classList.add("active-cell");
    }

    const activeKeyPrev = player1.isActive ? loc1 : loc2;

    const query2 = `.cell-${activeKeyPrev}`;
    const parentElement2 = document.querySelector(query2);

    if (parentElement2) {
      parentElement2.style.borderColor = "";
      parentElement2.classList.remove("active-cell");
    }
  };

  return (
    <div>
      <img src={wheel} alt="Wheel" className="Wheel-img" />
      <img
        className="arrow"
        src={arrow}
        alt="Arrow"
        style={{
          width: "85px",
          height: "60px",
          position: "absolute",
          left: "585px",
          top: "310px",
          transform: `rotate(${angle}deg)`,
          transformOrigin: "left center",
          transition: "transform 0.2s ease",
        }}
      />

      <button className="RotateButton" onClick={handleClick}>
        {status ? "Spin" : "Set"}
      </button>
    </div>
  );
};

export default Wheel;
