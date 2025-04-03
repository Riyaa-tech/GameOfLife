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
    if(loc1 == loc_cell && activePlayer === player2 && player1.autoCard > 0) {
      setMessage1("You have auto insurance to save you from the penalty. Do you want to use it?");
    }
    if(loc2 == loc_cell && activePlayer === player1 && player2.autoCard > 0) {
      setMessage1("You have auto insurance to save you from the penalty. Do you want to use it?");
    }
    if (loc1 == loc_cell && activePlayer === player2 && !penaltyP1) {
        setShowCardP1(true);
    }
    if (loc2 == loc_cell && activePlayer === player1 && !penaltyP2) {
        setShowCardP2(true);
    }
  }, [activePlayer, loc1, loc2, loc_cell, player1, player2, penaltyP1, penaltyP2])

    const TriggerPenaltyFunctionP1 = () => {
        if (showCardP1 && loc1 == loc_cell && player2 == activePlayer) {
            setPlayer1((prev) => ({ ...prev, amount: player1.amount - penaltyAmount }));
            setShowCardP1(false);
            setPenaltyP1(true);
            alert("Penalty triggered for Player 1!");
        }
    }

    const UseInsuranceFunctionP1 = () => {
        if (showCardP1 && loc1 === loc_cell && player2 === activePlayer) {
            setPlayer1((prev) => ({ ...prev, autoCard: player1.autoCard - 1, }));
            setShowCardP1(false);
            setPenaltyP1(true);
            alert("Player 1 exempted from paying auto repair charges!");
        } 
    } 

    const TriggerPenaltyFunctionP2 = () => {
        if (showCardP2 && loc2 === loc_cell && player1 === activePlayer) {
            setPlayer2((prev) => ({ ...prev, amount: player2.amount - penaltyAmount }));
            setShowCardP2(false);
            setPenaltyP2(true);
            alert("Penalty triggered for Player 2!");
        }
    }

    const UseInsuranceFunctionP2 = () => {
        if (showCardP2 && loc2 === loc_cell && player1 === activePlayer) {
            setPlayer2((prev) => ({ ...prev, autoCard: player2.autoCard - 1, }));
            setShowCardP2(false);
            setPenaltyP2(true);
            alert("Player 2 exempted from paying auto repair charges!");
        } 
    }

  return (
    <div>
      <div className="cellFill">{message}</div>
  
      {showCardP1 && (
        <div className="card1">
        <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>Penalty Portal<br />{message1}</h4>
        <br />
        <div
              style={{
                display: "flex",
                gap: "25px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <button
                onClick={UseInsuranceFunctionP1}
                style={{ backgroundColor: "green", height: "100px", width: "100px", display: (player1.autoCard > 0) ? "block" : "none" }}
              >
                Use Auto<br />Insurance
              </button>
              <button onClick={TriggerPenaltyFunctionP1} style={{ backgroundColor: "red", height: "100px", width: "100px" }}>
                Trigger Penalty<br />without Insurance
              </button>
            </div>
        </div>
      )}

{showCardP2 && (
        <div className="card1">
        <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>Penalty Portal<br />{message1}</h4>
        <br />
        <div
              style={{
                display: "flex",
                gap: "25px",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <button
                onClick={UseInsuranceFunctionP2}
                style={{ backgroundColor: "green", height: "100px", width: "100px", display: (player2.autoCard > 0) ? "block" : "none" }}
              >
                Use Auto<br />Insurance
              </button>
              <button onClick={TriggerPenaltyFunctionP2} style={{ backgroundColor: "red", height: "100px", width: "100px" }}>
                Trigger Penalty<br />without Insurance
              </button>
            </div>
        </div>
      )}

    </div> 
  );
};

export default Penalty;