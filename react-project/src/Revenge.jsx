import { useEffect, useState } from "react";
import "./GamePage.css";

const Revenge = ({
  player1,
  player2,
  activePlayer,
  setPlayer1,
  setPlayer2,
  loc1,
  loc2,
  locCell,
}) => {
  const [revengeTrigger1, setRevengeTrigger1] = useState(false);
  const [revengeTrigger2, setRevengeTrigger2] = useState(false);

  useEffect(() => {
    if (!revengeTrigger1 && loc1 === locCell && activePlayer === player1) {
      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount + 25000,
      }));

      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount - 25000,
      }));
      setRevengeTrigger1(true);
      /*alert("Revenge triggered for Player 1");*/
    }

    if (!revengeTrigger2 && loc2 === locCell && activePlayer === player2) {
      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount + 25000,
      }));

      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount - 25000,
      }));
      setRevengeTrigger2(true);
      /*alert("Revenge triggered for Player 2");*/
    }
  }, [
    activePlayer,
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    loc1,
    loc2,
    locCell,
    revengeTrigger1,
    revengeTrigger2,
  ]);

  useEffect(() => {
    if (loc1 < locCell && activePlayer === player1) {
      setRevengeTrigger1(false);
    }

    if (loc2 < locCell && activePlayer === player2) {
      setRevengeTrigger2(false);
    }
  }, [player1, player2, activePlayer, loc1, loc2, locCell]);

  return (
    <div>
      <div className="cellFill">
        🗡️ Revenge
        <br />
        Opponent pays 25000$ 🗡️
      </div>
    </div>
  );
};

export default Revenge;
