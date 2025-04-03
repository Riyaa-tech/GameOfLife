import { useEffect, useState } from "react";
import "./GamePage.css";

const BonusCards = ({
  activePlayer,
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  cost,
  title,
  message,
}) => {
  const [showCard, setShowCard] = useState(false);
  const [bonusTriggered, setBonusTriggered] = useState({
    p1: false,
    p2: false,
  });

  useEffect(() => {
    if (!bonusTriggered.p1 && loc1 === loc_cell) {
      setShowCard(true);
      setBonusTriggered((prev) => ({ ...prev, p1: true }));
    }

    if (!bonusTriggered.p2 && loc2 === loc_cell) {
      setShowCard(true);
      setBonusTriggered((prev) => ({ ...prev, p2: true }));
    }
  }, [loc1, loc2, loc_cell, bonusTriggered]);

  // Reset when players move away
  useEffect(() => {
    if (loc1 !== loc_cell)
      setBonusTriggered((prev) => ({ ...prev, p1: false }));
    if (loc2 !== loc_cell)
      setBonusTriggered((prev) => ({ ...prev, p2: false }));
  }, [loc1, loc2, loc_cell]);

  const yesFunction = () => {
    if (loc1 == loc_cell && activePlayer === player2 && title === "Stock") {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        stockCards: player1.stockCards + 1,
      }));
      alert("Stock card generated for Player 1");
    } else if (loc2 == loc_cell && activePlayer === player1 &&  title === "Stock") {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        stockCards: player2.stockCards + 1,
      }));
      alert("Stock card generated for Player 2");
    } else if (loc1 == loc_cell && activePlayer === player2 && title === "Share Penalty Wealth") {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        shareWealthCard: player1.shareWealthCard + 1,
      }));
      alert("Share Wealth card generated for Player1");
    } else if (loc2 == loc_cell && activePlayer === player1 && title === "Share Penalty Wealth") {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        shareWealthCard: player2.shareWealthCard + 1,
      }));
      alert("Share Wealth card generated for Player2");
    } else if (loc1 == loc_cell && activePlayer === player2 && title === "Exemption") {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        exemptionCard: player1.exemptionCard + 1,
      }));
      alert("Exemption card generated for Player1");
    } else if (loc2 == loc_cell && activePlayer === player1 && title === "Exemption") {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        exemptionCard: player2.exemptionCard + 1,
      }));
      alert("Exemption card generated for Player2");
    } else if (loc1 == loc_cell && activePlayer === player2 && title === "Auto Insurance") {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        autoCards: player1.autoCards + 1,
      }));
      alert("Auto card generated for Player1");
    } else if (loc2 == loc_cell && activePlayer === player1 && title === "Auto Insurance") {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        autoCards: player2.autoCards + 1,
      }));
      alert("Auto card generated for Player2");
    } else {
      console.log(title);
    }
    setShowCard(false);
  };

  const noFunction = () => {
    if (activePlayer === player1) {
      alert("No card generated for Player 1");
    } else {
      alert("No card generated for Player 2");
    }
    setShowCard(false);
  };

  return (
    <div>
      <div id="Insurance" className="cellFill">
        {message}
      </div>

      {showCard && (
        <div className="card1">
          <div
            className="displayProfessionData"
            style={{ flexDirection: "column" }}
          >
            <h2>
              Do you want to purchase {title} card worth {cost}$ ?
            </h2>
            <div
              style={{
                display: "flex",
                gap: "25px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <button
                onClick={yesFunction}
                style={{ backgroundColor: "green", height: "45px", width: "70px", }}
              >
                Yes
              </button>
              <button onClick={noFunction} style={{ backgroundColor: "red", height: "45px", width: "70px", }}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BonusCards;
