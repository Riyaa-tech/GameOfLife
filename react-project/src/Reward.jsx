import { useEffect, useState } from "react";
import "./GamePage.css";

const Payday = ({
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  rewardAmount,
}) => {
  const [rewardTriggeredP1, setrewardTriggeredP1] = useState(false);
  const [rewardTriggeredP2, setrewardTriggeredP2] = useState(false);

  useEffect(() => {
    // Trigger payday for Player 1
    if (!rewardTriggeredP1 && loc1 == loc_cell) {
      setPlayer1((prev) => ({ ...prev, amount: prev.amount + rewardAmount }));
      setrewardTriggeredP1(true);
      console.log("reward triggered for Player 1");
    }

    // Trigger payday for Player 2
    if (!rewardTriggeredP2 && loc2 == loc_cell) {
      setPlayer2((prev) => ({ ...prev, amount: prev.amount + rewardAmount }));
      setrewardTriggeredP2(true);
      console.log("reward triggered for Player 2");
    }
  }, [
    loc1,
    loc2,
    rewardTriggeredP1,
    rewardTriggeredP2,
    loc_cell,
    setPlayer1,
    setPlayer2,
    rewardAmount,
  ]);

  // Reset payday trigger when players move away from payday cell
  useEffect(() => {
    if (loc1 < loc_cell) setrewardTriggeredP1(false);
    if (loc2 < loc_cell) setrewardTriggeredP2(false);
  }, [loc1, loc2, loc_cell]);

  return (
    <div>
      <div id="RewardButton" className="cell-v cell-30 cell-corner-bottom-left">
        Reward
      </div>
    </div>
  );
};

export default Payday;
