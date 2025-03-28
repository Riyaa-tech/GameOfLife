import { useEffect, useState } from "react";
import "./GamePage.css";

const Reward = ({
  activePlayer,
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  message,
  rewardAmount,
}) => {
  const [rewardTriggeredP1, setrewardTriggeredP1] = useState(false);
  const [rewardTriggeredP2, setrewardTriggeredP2] = useState(false);

  useEffect(() => {
    // Trigger payday for Player 1
    if (!rewardTriggeredP1 && loc1 == loc_cell && activePlayer === player1) {
      setPlayer1((prev) => ({ ...prev, amount: prev.amount + rewardAmount }));
      setrewardTriggeredP1(true);
      /*
      alert("reward triggered for Player 1");
      */
    }

    // Trigger payday for Player 2
    if (!rewardTriggeredP2 && loc2 == loc_cell && activePlayer === player2) {
      setPlayer2((prev) => ({ ...prev, amount: prev.amount + rewardAmount }));
      setrewardTriggeredP2(true);
      /*
      alert("reward triggered for Player 2");
      */
    }
  }, [
    activePlayer,
    player1,
    player2,

    setPlayer1,
    setPlayer2,
    loc1,
    loc2,
    loc_cell,
    message,
    rewardAmount,
    rewardTriggeredP1,
    rewardTriggeredP2,
  ]);

  // Reset payday trigger when players move away from payday cell
  useEffect(() => {
    if (loc1 < loc_cell) setrewardTriggeredP1(false);
    if (loc2 < loc_cell) setrewardTriggeredP2(false);
  }, [loc1, loc2, loc_cell]);

  return <div className="cellFill">{message}</div>;
};

export default Reward;
