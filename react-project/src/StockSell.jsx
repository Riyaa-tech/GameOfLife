import { useState } from "react";
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
  const [showCard, setShowCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [stepValue, setStepValue] = useState(0);
  const [message, setMessage] = useState("");

  const getAngle = (x, y) => {
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const angle = getAngle(position.x, position.y);

  const getSteps = () => {
    if (angle > 30 && angle <= 90) return 2;
    if (angle > 90 && angle <= 150) return 3;
    if (angle > 150 && angle <= 210) return 4;
    if (angle > 210 && angle <= 270) return 5;
    if (angle > 270 && angle <= 330) return 6;
    return 1;
  };

  const handleClick = () => {
    if (stepValue >= 0) {
      setPosition({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
      });
    } else {
      setPosition({ x: 0, y: 0 });
      setStepValue(getSteps());
    }

    if (
      selectedButtons.length > 0 &&
      (stepValue === selectedButtons[0] || stepValue === selectedButtons[1])
    ) {
      setMessage("🎉 Congratulations! The chosen stock has boomed! 🎉");
    } else {
      setMessage("😔 Hard luck! The chosen stock has not made a profit. 😔");
    }
  };

  const confirmStock = () => {
    if (
      (stepValue === selectedButtons[0] || stepValue === selectedButtons[1]) &&
      loc1 === loc_cell &&
      activePlayer === player1
    ) {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount + stockPrice,
        stockCards: prev.stockCards - 1,
      }));
    }

    if (
      (stepValue === selectedButtons[0] || stepValue === selectedButtons[1]) &&
      loc2 === loc_cell &&
      activePlayer === player2
    ) {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount + stockPrice,
        stockCards: prev.stockCards - 1,
      }));
    }
    alert("Stock amount credited!");
    setShowCard(false);
  };

  const handleStockSell = () => {
    if (
      (activePlayer === player1 && player1.stockCards <= 0) ||
      (activePlayer === player2 && player2.stockCards <= 0)
    ) {
      setIsVisible(true); // Show "lack of tokens" message
    } else {
      setShowCard(true); // Show stock selling card
    }
  };

  return (
    <div>
      <button className="buttonFill" onClick={handleStockSell}>
        Sell stocks
        <br />
        💲Click cell💲
      </button>

      {/* Lack of stock tokens message */}
      {isVisible && (
        <div className="card1">
          <h2>😔 Couldn't sell the stocks due to lack of tokens. 😔</h2>
          <button onClick={() => setIsVisible(false)}>Ok</button>
        </div>
      )}

      {/* Stock selling portal */}
      {showCard && (
        <div className="card1">
          <div>Stock selling portal</div>
          <div>
            <img
              src={cardWheel}
              alt="Wheel"
              className="Wheel-img"
              style={{
                borderRadius: "50%",
                height: "130px",
                width: "130px",
                top: "340px",
                left: "825px",
              }}
            />
            <img
              className="arrow"
              src={arrow}
              alt="Arrow"
              style={{
                width: "60px",
                height: "30px",
                position: "absolute",
                left: "122px",
                top: "141px",
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
                transition: "transform 0.2s ease",
              }}
            />

            <button
              className="RotateButton"
              onClick={handleClick}
              style={{
                height: "60px",
                width: "60px",
                top: "320px",
                left: "862.5px",
              }}
            >
              Spin
            </button>
          </div>
          <div>Selected stocks: {selectedButtons.join(", ") || "None"}</div>
          <div>{message}</div>
          <button onClick={confirmStock}>Ok</button>
        </div>
      )}
    </div>
  );
};

export default StockSell;
