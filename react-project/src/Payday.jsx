import { useEffect, useState } from "react";
import "./GamePage.css";

const Payday = ({ setPlayer1, setPlayer2, loc1, loc2, loc_cell }) => {
  const [paydayTriggeredP1, setPaydayTriggeredP1] = useState(false);
  const [paydayTriggeredP2, setPaydayTriggeredP2] = useState(false);

  useEffect(() => {
    // Trigger payday for Player 1
    if (!paydayTriggeredP1 && loc1 >= loc_cell) {
      setPlayer1((prev) => ({ ...prev, amount: prev.amount + prev.salary }));
      setPaydayTriggeredP1(true);
      console.log("Payday triggered for Player 1");
    }

    // Trigger payday for Player 2
    if (!paydayTriggeredP2 && loc2 >= loc_cell) {
      setPlayer2((prev) => ({ ...prev, amount: prev.amount + prev.salary }));
      setPaydayTriggeredP2(true);
      console.log("Payday triggered for Player 2");
    }
  }, [
    loc1,
    loc2,
    paydayTriggeredP1,
    paydayTriggeredP2,
    loc_cell,
    setPlayer1,
    setPlayer2,
  ]);

  // Reset payday trigger when players move away from payday cell
  useEffect(() => {
    if (loc1 < loc_cell) setPaydayTriggeredP1(false);
    if (loc2 < loc_cell) setPaydayTriggeredP2(false);
  }, [loc1, loc2, loc_cell]);

  return (
    <div>
      <div id="PaydayButton" className="cell-v cell-30 cell-corner-bottom-left">
        Payday
      </div>
    </div>
  );
};

export default Payday;
