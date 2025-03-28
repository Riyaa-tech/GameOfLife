import { useEffect, useState } from "react";
import "./GamePage.css";

const Penalty = ({
  isAutoActive,
  setAutoActive,
  isShareActive,
  setShareActive,
  isExcemptionActive,
  setExemptionActive,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  penaltyAmount,
  message,
}) => {
  const [penaltyTriggeredP1, setpenaltyTriggeredP1] = useState(false);
  const [penaltyTriggeredP2, setpenaltyTriggeredP2] = useState(false);

  useEffect(() => {
    if (!penaltyTriggeredP1 && loc1 == loc_cell && isExcemptionActive) {
      alert(`Exempted from paying penalty!`);
      setPlayer1((prev) => ({
        ...prev,
        exemptionCard: prev.exemptionCard - 1,
      }));
      setExemptionActive(false);
      return;
    }

    if (!penaltyTriggeredP2 && loc2 == loc_cell && isExcemptionActive) {
      alert(`Exempted from paying penalty!`);
      setPlayer2((prev) => ({
        ...prev,
        exemptionCard: prev.exemptionCard - 1,
      }));
      setExemptionActive(false);
      return;
    }

    if (!penaltyTriggeredP1 && loc1 == loc_cell && isAutoActive) {
      alert(`Exempted from paying charges!`);
      setPlayer1((prev) => ({
        ...prev,
        autoCard: prev.autoCard - 1,
      }));
      setAutoActive(false);
      return;
    }

    if (!penaltyTriggeredP2 && loc2 == loc_cell && isAutoActive) {
      alert(`Exempted from paying charges!`);
      setPlayer2((prev) => ({
        ...prev,
        autoCard: prev.autoCard - 1,
      }));
      setAutoActive(false);
      return;
    }
    //sharewealth card decr, setpenalty true
    if (
      !penaltyTriggeredP2 &&
      (loc2 == loc_cell || loc1 == loc_cell) &&
      isShareActive
    ) {
      alert(`Share Wealth!`);
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - penaltyAmount / 2,
      }));
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - penaltyAmount / 2,
      }));
      setExemptionActive(false);
      return;
    }

    if (!penaltyTriggeredP1 && loc1 == loc_cell) {
      setPlayer1((prev) => ({ ...prev, amount: prev.amount - penaltyAmount }));
      setpenaltyTriggeredP1(true);
      console.log("penalty triggered for Player 1");
    }

    if (!penaltyTriggeredP2 && loc2 == loc_cell) {
      setPlayer2((prev) => ({ ...prev, amount: prev.amount - penaltyAmount }));
      setpenaltyTriggeredP2(true);
      console.log("penalty triggered for Player 2");
    }
  }, [
    isAutoActive,
    setAutoActive,
    isShareActive,
    setShareActive,
    isExcemptionActive,
    setExemptionActive,
    loc1,
    loc2,
    penaltyTriggeredP1,
    penaltyTriggeredP2,
    loc_cell,
    setPlayer1,
    setPlayer2,
    penaltyAmount,
  ]);

  // Reset payday trigger when players move away from payday cell
  useEffect(() => {
    if (loc1 < loc_cell) setpenaltyTriggeredP1(false);
    if (loc2 < loc_cell) setpenaltyTriggeredP2(false);
  }, [loc1, loc2, loc_cell]);

  return (
    <div>
      <div className="cellFill">{message}</div>
    </div>
  );
};

export default Penalty;
/*import { useEffect, useState } from "react";
import "./GamePage.css";

const Penalty = ({
  isAutoActive,
  setAutoActive,
  isShareActive,
  setShareActive,
  isExcemptionActive,
  setExemptionActive,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  loc_cell,
  penaltyAmount,
}) => {
  const [penaltyTriggeredP1, setpenaltyTriggeredP1] = useState(false);
  const [penaltyTriggeredP2, setpenaltyTriggeredP2] = useState(false);

  useEffect(() => {
    if (!penaltyTriggeredP1 && loc1 == loc_cell && isExcemptionActive) {
      alert(`Exempted from paying penalty!`);
      setPlayer1((prev) => ({
        ...prev,
        exemptionCard: prev.exemptionCard - 1,
      }));
      setExemptionActive(false);
      return;
    }

    if (!penaltyTriggeredP2 && loc2 == loc_cell && isExcemptionActive) {
      alert(`Exempted from paying penalty!`);
      setPlayer2((prev) => ({
        ...prev,
        exemptionCard: prev.exemptionCard - 1,
      }));
      setExemptionActive(false);
      return;
    }

    if (!penaltyTriggeredP1 && loc1 == loc_cell && isAutoActive) {
      alert(`Exempted from paying charges!`);
      setPlayer1((prev) => ({
        ...prev,
        autoCard: prev.autoCard - 1,
      }));
      setAutoActive(false);
      return;
    }

    if (!penaltyTriggeredP2 && loc2 == loc_cell && isAutoActive) {
      alert(`Exempted from paying charges!`);
      setPlayer2((prev) => ({
        ...prev,
        autoCard: prev.autoCard - 1,
      }));
      setAutoActive(false);
      return;
    }
    //sharewealth card decr, setpenalty true
    if (
      !penaltyTriggeredP2 &&
      (loc2 == loc_cell || loc1 == loc_cell) &&
      isShareActive
    ) {
      alert(`Share Wealth!`);
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - penaltyAmount / 2,
      }));
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - penaltyAmount / 2,
      }));
      setExemptionActive(false);
      return;
    }

    if (!penaltyTriggeredP1 && loc1 == loc_cell) {
      setPlayer1((prev) => ({ ...prev, amount: prev.amount - penaltyAmount }));
      setpenaltyTriggeredP1(true);
      console.log("penalty triggered for Player 1");
    }

    if (!penaltyTriggeredP2 && loc2 == loc_cell) {
      setPlayer2((prev) => ({ ...prev, amount: prev.amount - penaltyAmount }));
      setpenaltyTriggeredP2(true);
      console.log("penalty triggered for Player 2");
    }
  }, [
    isAutoActive,
    setAutoActive,
    isShareActive,
    setShareActive,
    isExcemptionActive,
    setExemptionActive,
    loc1,
    loc2,
    penaltyTriggeredP1,
    penaltyTriggeredP2,
    loc_cell,
    setPlayer1,
    setPlayer2,
    penaltyAmount,
  ]);

  // Reset payday trigger when players move away from payday cell
  useEffect(() => {
    if (loc1 < loc_cell) setpenaltyTriggeredP1(false);
    if (loc2 < loc_cell) setpenaltyTriggeredP2(false);
  }, [loc1, loc2, loc_cell]);

  return (
    <div>
      <div
        id="PenaltyButton"
        className="cell-v cell-30 cell-corner-bottom-left"
      >
        Penalty
      </div>
    </div>
  );
};

export default Penalty;*/
