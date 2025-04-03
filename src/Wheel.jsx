import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import arrow from "./Images/arrow.png";
import wheel from "./Images/wheel.png";
import greenPin from "./Images/greenPin.png";
import bluePin from "./Images/bluePin.png";
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
  const [click, setClick] = useState(0); // Now using state for click count
  const [loc1Final, setLoc1Final] = useState(false);
  const [loc2Final, setLoc2Final] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(loc1Final) {
      document.querySelectorAll(".img1").forEach((element) => {
        element.style.display = "none";
      })
    }

    if(loc2Final) {
      document.querySelectorAll(".img2").forEach((element) => {
        element.style.display = "none";
      })
    }
  }, [loc1Final, loc2Final])

  const resetAll = () => {
    setPlayer1((prev) => ({ ...prev, isActive: !player1.isActive }));
    setPlayer2((prev) => ({ ...prev, isActive: !player2.isActive }));

    setClick((prevClick) => prevClick + 1); // Properly increments click count
    console.log(`click: ${click + 1}`);
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
    if (angle > 90 && angle <= 150) return 5;
    if (angle > 150 && angle <= 210) return 4;
    if (angle > 210 && angle <= 270) return 3;
    if (angle > 270 && angle <= 330) return 2;
    return 1;
  };

  const updateLocation = (stepValue) => {
    if (player1.isActive && !loc1Final) {
      setLoc1((prevLoc) => {
        const newLoc = Math.min(prevLoc + stepValue, 37);
        if (newLoc >= 37) setLoc1Final(true);
        return newLoc;
      });
    } else if (player2.isActive && !loc2Final){
      setLoc2((prevLoc) => {
        const newLoc = Math.min(prevLoc + stepValue, 37);
        if (newLoc >= 37) setLoc2Final(true);
        return newLoc;
      });
    }

    if (loc1Final && loc2Final) {
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

    const query1 = `.cell-${activeKeyNext - 1}`;
    const parentElement1 = document.querySelector(query1);

    const query1_img1 = `.img1-${activeKeyNext}`;
    const query1_img2 = `.img2-${activeKeyNext}`;
    const parentElement1_img1 = document.querySelector(query1_img1);
    const parentElement1_img2 = document.querySelector(query1_img2);

    if (parentElement1) {
      if (player1.isActive) {
        parentElement1_img1.style.display = "block";
        console.log(`Player1 moved to cell ${activeKeyNext}`);
      } else {
        parentElement1_img2.style.display = "block";
        console.log(`Player2 moved to cell ${activeKeyNext}`);
      }
    }

    const activeKeyPrev = player1.isActive ? loc1 : loc2;

    const query2 = `.cell-${activeKeyPrev - 1}`;
    const parentElement2 = document.querySelector(query2);

    const query2_img1 = `.img1-${activeKeyPrev}`;
    const query2_img2 = `.img2-${activeKeyPrev}`;
    const parentElement2_img1 = document.querySelector(query2_img1);
    const parentElement2_img2 = document.querySelector(query2_img2);

    if (parentElement2) {
      if (player1.isActive) {
        parentElement2_img1.style.display = "none";
      } else {
        parentElement2_img2.style.display = "none";
      }
    }
  };

  return (
    <div>
      {click < 1 && (
        <div>
          <img src={bluePin} alt="" className="img1-0" style={{ left: "340px", top: "355px" }} />
        </div>
      )}
      {click < 2 && (
        <div>
          <img src={greenPin} alt="" className="img2-0" style={{ left: "370px", top: "355px" }} />
        </div>
      )}
      {loc1Final && (
        <div>
          <img src={bluePin} alt="" className="img1-37" style={{ left: "40px", top: "95px" }}/>
        </div>
      )}
      {loc2Final && (
        <div>
          <img src={greenPin} alt="" className="img2-37" style={{ left: "70px", top: "95px" }}/>
        </div>
      )}

      <img src={wheel} alt="Wheel" className="Wheel-img" />
      <img
        className="arrow"
        src={arrow}
        alt="Arrow"
        style={{
          width: "85px",
          height: "60px",
          position: "absolute",
          left: "588px",
          top: "315px",
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
