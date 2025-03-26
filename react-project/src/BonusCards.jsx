import { useEffect, useState } from "react";
import "./GamePage.css";

const BonusCards = ({
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  cost,
  title,
}) => {
  const [BonusCardTriggeredP1, setBonusCardTriggeredP1] = useState(false);
  const [BonusCardTriggeredP2, setBonusCardTriggeredP2] = useState(false);

  useEffect(() => {
    // Trigger payday for Player 1
    if (!BonusCardTriggeredP1 && loc1 == loc_cell) {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        autoCards: prev.autoCards + 1,
      }));
      setBonusCardTriggeredP1(true);
      console.log("Card generated for Player 1");
    }

    // Trigger payday for Player 2
    if (!BonusCardTriggeredP2 && loc2 == loc_cell) {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - cost,
        autoCards: prev.autoCards + 1,
      }));
      setBonusCardTriggeredP2(true);
      console.log("Card generated for Player 2");
    }
  }, [
    loc1,
    loc2,
    BonusCardTriggeredP1,
    BonusCardTriggeredP2,
    loc_cell,
    setPlayer1,
    setPlayer2,
    cost,
    title,
  ]);

  // Reset payday trigger when players move away from payday cell
  useEffect(() => {
    if (loc1 < loc_cell) setBonusCardTriggeredP1(false);
    if (loc2 < loc_cell) setBonusCardTriggeredP2(false);
  }, [loc1, loc2, loc_cell]);

  return (
    <div>
      <div
        id="PenaltyButton"
        className="cell-v cell-30 cell-corner-bottom-left"
      >
        ${title} Insurance
      </div>
    </div>
  );
};

export default BonusCards;
