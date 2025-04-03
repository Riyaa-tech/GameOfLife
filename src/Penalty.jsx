import { useEffect, useState } from "react";
import "./GamePage.css";

const Penalty = ({
  setPlayer1,
  setPlayer2,
  activePlayer,
  player1,
  player2,
  loc1,
  loc2,
  loc_cell,
  penaltyAmount,
  message,
}) => {

  const [showCardP1, setShowCardP1] = useState(false);
  const [showCardP2, setShowCardP2] = useState(false);
  const [penaltyP1, setPenaltyP1] = useState(false);
  const [penaltyP2, setPenaltyP2] = useState(false);
  const [message1, setMessage1] = useState("😔 You have no cards to save you from penalty 😔");

  useEffect(() => {
    if (loc1 === loc_cell && activePlayer === player2 && (player1.exemptionCard > 0 || player1.shareWealthCard > 0)) {
      setMessage1("You have insurance cards to save you from the penalty. Do you want to use it?");
    }
    if (loc2 === loc_cell && activePlayer === player1 && (player2.exemptionCard > 0 || player2.shareWealthCard > 0)) {
      setMessage1("You have insurance cards to save you from the penalty. Do you want to use it?");
    }
    if (loc1 === loc_cell && activePlayer === player2 && !penaltyP1) {
      setShowCardP1(true);
    }
    if (loc2 === loc_cell && activePlayer === player1 && !penaltyP2) {
      setShowCardP2(true);
    }
  }, [activePlayer, loc1, loc2, loc_cell, player1, player2, penaltyP1, penaltyP2]);

  const TriggerPenaltyFunctionP1 = () => {
    if (showCardP1 && loc1 === loc_cell && player2 === activePlayer) {
      setPlayer1((prev) => ({ ...prev, amount: prev.amount - penaltyAmount }));
      setShowCardP1(false);
      setPenaltyP1(true);
      alert("Penalty triggered for Player 1!");
    }
  };

  const TriggerPenaltyFunctionP2 = () => {
    if (showCardP2 && loc2 === loc_cell && player1 === activePlayer) {
      setPlayer2((prev) => ({ ...prev, amount: prev.amount - penaltyAmount }));
      setShowCardP2(false);
      setPenaltyP2(true);
      alert("Penalty triggered for Player 2!");
    }
  };

  const UseShareFunctionP1 = () => {
    if (showCardP1 && loc1 === loc_cell && player2 === activePlayer) {
      setPlayer1((prev) => ({ ...prev, shareWealthCard: prev.shareWealthCard - 1, amount: prev.amount - penaltyAmount / 2 }));
      setPlayer2((prev) => ({ ...prev, amount: prev.amount - penaltyAmount / 2 }));
      setShowCardP1(false);
      setPenaltyP1(true);
      alert("Share wealth insurance triggered for Player 1!");
    }
  };

  const UseShareFunctionP2 = () => {
    if (showCardP2 && loc2 === loc_cell && player1 === activePlayer) {
      setPlayer2((prev) => ({ ...prev, shareWealthCard: prev.shareWealthCard - 1, amount: prev.amount - penaltyAmount / 2 }));
      setPlayer1((prev) => ({ ...prev, amount: prev.amount - penaltyAmount / 2 }));
      setShowCardP2(false);
      setPenaltyP2(true);
      alert("Share wealth insurance triggered for Player 2!");
    }
  };

  const UseExemptionFunctionP1 = () => {
    if (showCardP1 && loc1 === loc_cell && player2 === activePlayer) {
      setPlayer1((prev) => ({ ...prev, exemptionCard: prev.exemptionCard - 1 }));
      setShowCardP1(false);
      setPenaltyP1(true);
      alert("Player 1 exempted from paying penalty!");
    }
  };

  const UseExemptionFunctionP2 = () => {
    if (showCardP2 && loc2 === loc_cell && player1 === activePlayer) {
      setPlayer2((prev) => ({ ...prev, exemptionCard: prev.exemptionCard - 1 }));
      setShowCardP2(false);
      setPenaltyP2(true);
      alert("Player 2 exempted from paying penalty!");
    }
  };

  return (
    <div>
      <div className="cellFill">{message}</div>

      {showCardP1 && (
        <div className="card1">
          <h4 style={{marginTop: "5px", marginBottom: "5px"}}>Penalty Portal<br />{message1}</h4>
          <div className="button-group" style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
            <button onClick={UseShareFunctionP1} style={{ backgroundColor: "green", display: player1.shareWealthCard > 0 ? "block" : "none", height: "110px", width: "80px" }}>
              Use Share Penalty Wealth Insurance
            </button>
            <button onClick={UseExemptionFunctionP1} style={{ backgroundColor: "green", display: player1.exemptionCard > 0 ? "block" : "none", height: "110px", width: "80px" }}>
              Use Exemp-<br />tion Insurance
            </button>
            <button onClick={TriggerPenaltyFunctionP1} style={{ backgroundColor: "red", height: "110px", width: "80px" }}>
              Trigger Penalty without Insurance
            </button>
          </div>
        </div>
      )}

      {showCardP2 && (
        <div className="card1">
          <h4 style={{marginTop: "5px", marginBottom: "5px"}}>Penalty Portal<br />{message1}</h4>
          <div className="button-group" style={{display: "flex", gap: "5px", justifyContent: "center", alignItems: "center"}}>
            <button onClick={UseShareFunctionP2} style={{ backgroundColor: "green", display: player2.shareWealthCard > 0 ? "block" : "none", height: "110px", width: "80px" }}>
              Use Share Penalty Wealth Insurance
            </button>
            <button onClick={UseExemptionFunctionP2} style={{ backgroundColor: "green", display: player2.exemptionCard > 0 ? "block" : "none", height: "110px", width: "80px" }}>
              Use Exemp-<br />tion Insurance
            </button>
            <button onClick={TriggerPenaltyFunctionP2} style={{ backgroundColor: "red", height: "110px", width: "80px" }}>
              Trigger Penalty without Insurance
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Penalty;
