import { useEffect, useState } from "react";
import cardWheel from "./Images/cardWheel.png";
import arrow from "./Images/arrow.png";
import "./GamePage.css";

const StockSell = ({
  activePlayer,
  player1,
  player2,
  selectedButtons,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  stockPrice,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [steps, setSteps] = useState(1);
  const [showCardP1, setShowCardP1] = useState(false);
  const [showCardP2, setShowCardP2] = useState(false);
  const [message1, setMessage1] = useState("😔 Couldn't sell the stocks due to lack of tokens 😔");
  const [message2, setMessage2] = useState("");
  const [isDisabled1, setIsDisabled1] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);
  const [res1, setRes1] = useState(false);
  const [res2, setRes2] = useState(false);

  const getAngle = (x, y) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const angle = getAngle(position.x, position.y);

  const getSteps = (angle) => {
    if (angle > 30 && angle <= 90) return 6;
    if (angle > 90 && angle <= 150) return 5;
    if (angle > 150 && angle <= 210) return 4;
    if (angle > 210 && angle <= 270) return 3;
    if (angle > 270 && angle <= 330) return 2;
    return 1;
  };

  useEffect(() => {
    setSteps(getSteps(getAngle(position.x, position.y)));
    if (selectedButtons.includes(steps)) {
      setMessage2("🎉 Congratulations! The chosen stock has boomed! 🎉");
    } else {
      setMessage2("😔 Hard luck! The chosen stock has not made a profit. 😔");
    }
  }, [position, selectedButtons, steps]);

  const handleClick1 = () => {
    setRes1(true);
    setPosition({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    });
  };

  const handleClick2 = () => {
    setRes2(true);
    setPosition({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
    });
  };

  const confirmStockP1 = () => {
    if (player1.stockCards > 0) {
      if (selectedButtons.includes(getSteps())) {
        setPlayer1((prev) => ({
          ...prev,
          amount: prev.amount + stockPrice,
        }));
      }
      setPlayer1((prev) => ({
        ...prev,
        stockCards: Math.max(0, prev.stockCards - 1),
      }));
    }
    setShowCardP1(false);
    setRes1(false);
  };

  const confirmStockP2 = () => {
    if (player2.stockCards > 0) {
      if (selectedButtons.includes(getSteps())) {
        setPlayer2((prev) => ({
          ...prev,
          amount: prev.amount + stockPrice,
        }));
      }
      setPlayer2((prev) => ({
        ...prev,
        stockCards: Math.max(0, prev.stockCards - 1),
      }));
    }
    setShowCardP2(false);
    setRes2(false);
  };

  useEffect(() => {
    if (loc1 == loc_cell && activePlayer === player2) {
      setShowCardP1(true);
    }
    if (loc2 == loc_cell && activePlayer === player1) {
      setShowCardP2(true);
    }

    if (player1.stockCards > 0 && loc1 == loc_cell && activePlayer === player2) {
      setMessage1(`Selected stocks: ${selectedButtons.join(", ") || "None"}`);
      setIsDisabled1(false);
    }
    if (player2.stockCards > 0 && loc2 == loc_cell && activePlayer === player1) {
      setMessage1(`Selected stocks: ${selectedButtons.join(", ") || "None"}`);
      setIsDisabled2(false);
    }
  }, [selectedButtons, activePlayer, loc1, loc2, loc_cell, player1, player2]);

  return (
    <div>
      <button className="buttonFill">
        💲Sell stocks <br />
        Select 2 stocks<br />on the scale💲
      </button>

      {showCardP1 && (
        <div className="card1">
          <img
              className="Wheel-img"
              src={cardWheel}
              alt="Wheel"
              style={{
                borderRadius: "50%",
                height: "80px",
                width: "80px",
                top: "345px",
                left: "850px",
              }}
            />
            <img
              className="arrow"
              src={arrow}
              alt="Arrow"
              style={{
                width: "30px",
                height: "20px",
                position: "absolute",
                left: "125px",
                top: "125px",
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
                transition: "transform 0.2s ease",
              }}
            />
            <button
              className="RotateButton"
              onClick={handleClick1}
              disabled={isDisabled1}
              style={{
                padding: "2px",
                height: "40px",
                width: "40px",
                top: "365px",
                left: "870px",
              }}
            >
              Spin
            </button>
            <h4 style={{ marginTop: "5px" }}>Stock Market Portal<br />{message1}<br />{(res1) ? message2 : ""}</h4>
          <button onClick={confirmStockP1} style={{ position: "fixed", top: "428px", left: "855px", height: "45px", width: "70px", }}>Ok</button>
        </div>
      )}

      {showCardP2 && (
        <div className="card1">
          <img
              className="Wheel-img"
              src={cardWheel}
              alt="Wheel"
              style={{
                borderRadius: "50%",
                height: "80px",
                width: "80px",
                top: "345px",
                left: "850px",
              }}
            />
            <img
              className="arrow"
              src={arrow}
              alt="Arrow"
              style={{
                width: "30px",
                height: "20px",
                position: "absolute",
                left: "125px",
                top: "125px",
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
                transition: "transform 0.2s ease",
              }}
            />
            <button
              className="RotateButton"
              onClick={handleClick2}
              disabled={isDisabled2}
              style={{
                padding: "2px",
                height: "40px",
                width: "40px",
                top: "365px",
                left: "870px",
              }}
            >Spin</button>
          <h4 style={{ marginTop: "5px" }}>Stock Market Portal<br />{message1}<br />{(res2) ? message2 : ""}</h4>
          <button onClick={confirmStockP2} style={{ position: "fixed", top: "428px", left: "855px", height: "45px", width: "70px", }}>Ok</button>
        </div>
      )}
    </div>
  );
};

export default StockSell;