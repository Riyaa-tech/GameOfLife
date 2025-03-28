import ProfessionPicker from "./Profession-Picker.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Wheel from "./Wheel.jsx";
import "./GamePage.css";
import Reward from "./Reward.jsx";
import Revenge from "./Revenge.jsx";
import BonusCards from "./BonusCards.jsx";
import StockSell from "./StockSell.jsx";
import Penalty from "./Penalty.jsx";

function GamePage() {
  const location = useLocation();
  const [loc1, setLoc1] = useState(0);
  const [loc2, setLoc2] = useState(0);
  const [count, setCount] = useState(0);
  const { player1_name, player2_name } = location.state || {};

  const [Player1, setPlayer1] = useState({
    name: player1_name,
    profession: "",
    salary: 0,
    amount: 10000,
    paydayCount1: 0,
    shareWealthCard: 0,
    exemptionCard: 0,
    stockCards: 0,
    autoCards: 0,
    isActive: true,
    loc1: loc1,
  });

  const [Player2, setPlayer2] = useState({
    name: player2_name,
    profession: "",
    salary: 0,
    amount: 10000,
    paydayCount2: 0,
    shareWealthCard: 0,
    exemptionCard: 0,
    stockCards: 0,
    autoCards: 0,
    isActive: false,
    loc2: loc2,
  });

  const [activePlayer, setActivePlayer] = useState(
    Player1.isActive ? Player1 : Player2
  );
  const [opponent, setOpponent] = useState(
    Player1.isActive ? Player2 : Player1
  );

  const [isAutoActive, setAutoActive] = useState(false);
  const [isStockActive, setStockActive] = useState(false);
  const [isShareActive, setShareActive] = useState(false);
  const [isExcemptionActive, setExemptionActive] = useState(false);

  useEffect(() => {
    if (Player1.isActive) {
      setActivePlayer(Player1);
      setOpponent(Player2);
    } else {
      setActivePlayer(Player2);
      setOpponent(Player1);
    }
  }, [Player1, Player2]);

  useEffect(() => {
    const specialCells = new Set([2, 5, 8, 12, 16, 21, 26, 32]);

    const getPaydayCount = (loc) => {
      let count = 0;
      for (let i = 0; i <= loc; i++) {
        if (specialCells.has(i)) {
          count++;
        }
      }
      return count;
    };

    const newPaydayCount = getPaydayCount(loc1);

    if (activePlayer === Player1 && newPaydayCount > Player1.paydayCount1) {
      const additionalPaydays = newPaydayCount - Player1.paydayCount1;

      setPlayer1((prev) => ({
        ...prev,
        amount: prev.amount + additionalPaydays * prev.salary,
        paydayCount1: newPaydayCount,
      }));

      /*console.log("P1 Payday:", additionalPaydays * Player1.salary);
      alert(
        `Payday triggered for Player 1! Received: $${
          additionalPaydays * Player1.salary
        }`
      );*/
    }
  }, [Player1, activePlayer, loc1]);

  useEffect(() => {
    const specialCells = new Set([2, 5, 8, 12, 16, 21, 26, 32]);

    const getPaydayCount = (loc) => {
      let count = 0;
      for (let i = 0; i <= loc; i++) {
        if (specialCells.has(i)) {
          count++;
        }
      }
      return count;
    };

    const newPaydayCount = getPaydayCount(loc2);
    if (activePlayer === Player2 && newPaydayCount > Player2.paydayCount2) {
      const additionalPaydays = newPaydayCount - Player2.paydayCount2;

      setPlayer2((prev) => ({
        ...prev,
        amount: prev.amount + additionalPaydays * prev.salary,
        paydayCount2: newPaydayCount,
      }));

      /*console.log("P2 Payday:", additionalPaydays * Player2.salary);
      alert(
        `Payday triggered for Player 2! Received: $${
          additionalPaydays * Player2.salary
        }`
      );*/
    }
  }, [Player2, activePlayer, loc2]);

  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (buttonNumber) => {
    if (isStockActive) {
      setSelectedButtons((prev) => {
        if (prev.includes(buttonNumber)) {
          return prev.filter((num) => num !== buttonNumber); // Remove if already selected
        } else if (prev.length < 2) {
          return [...prev, buttonNumber]; // Add if less than 2 are selected
        }
        return prev;
      });
    }
  };

  return (
    <>
      <div className="FullPage">
        <div className="ProfileDisplay">
          <div className="Profile-1">
            <h2 className="PlayerName">{Player1.name}</h2>
            <h3>
              Profession: {Player1.profession}
              <br />
              Salary: $ {Player1.salary.toLocaleString()}
              <br />
              Amount: {Player1.amount}
            </h3>

            <div className="Options">
              <button
                className="OptionButton stockInsurance "
                disabled={Player1.stockCards > 0 ? false : true}
                onClick={() => {
                  setStockActive(true);
                }}
              >
                Stock
                <br />
                tokens <br /> {Player1.stockCards}
              </button>
              <button
                className="OptionButton autoInsurance"
                disabled={Player1.autoCards > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setAutoActive(true);
                }}
              >
                Auto
                <br />
                Insurance <br /> {Player1.autoCards}
              </button>
              <button
                className="OptionButton shareWealthCard"
                disabled={Player1.shareWealthCard > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setShareActive(true);
                }}
              >
                Share Wealth <br /> {Player1.shareWealthCard}
              </button>
              <button
                className="OptionButton exemptionCard"
                disabled={Player1.exemptionCard > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setExemptionActive(true);
                }}
              >
                Exemption <br /> {Player1.exemptionCard}
              </button>
            </div>
          </div>

          <div className="Profile-2">
            <h2 className="PlayerName">{Player2.name}</h2>
            <h3>
              Profession: {Player2.profession}
              <br />
              Salary: $ {Player2.salary.toLocaleString()}
              <br />
              Amount: {Player2.amount}
            </h3>

            <div className="Options">
              <button
                className="OptionButton stockInsurance "
                disabled={Player2.stockCards > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setStockActive(true);
                }}
              >
                Stock
                <br />
                tokens <br /> {Player2.stockCards}
              </button>
              <button
                className="OptionButton autoInsurance"
                disabled={Player2.autoCards > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setAutoActive(true);
                }}
              >
                Auto
                <br />
                Insurance <br /> {Player2.autoCards}
              </button>
              <button
                className="OptionButton shareWealthCard"
                disabled={Player2.shareWealthCard > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setShareActive(true);
                }}
              >
                Share Wealth <br /> {Player2.shareWealthCard}
              </button>
              <button
                className="OptionButton exemptionCard"
                disabled={Player2.exemptionCard > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setExemptionActive(true);
                }}
              >
                Exemption <br /> {Player2.exemptionCard}
              </button>
            </div>
          </div>
        </div>

        <div className="GameBoard">
          <Wheel
            count={count}
            player1={Player1}
            player2={Player2}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            activePlayer={activePlayer}
            opponent={opponent}
            loc1={loc1}
            loc2={loc2}
            setLoc1={setLoc1}
            setLoc2={setLoc2}
          />

          <div className="col col-1">
            <div className="cell-v cell-37 end-cell">Retirement 🏡</div>
            <div className="cell-v cell-36">
              <Reward
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={36}
                message={"🎉 Won singing contest! Collect $5000! 🎉"}
                rewardAmount={5000}
              />
            </div>
            <div className="cell-v cell-35">
              <Penalty
                isAutoActive={isAutoActive}
                setAutoActive={setAutoActive}
                isExcemptionActive={isExcemptionActive}
                setExemptionActive={setExemptionActive}
                isShareActive={isShareActive}
                setShareActive={setActivePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={35}
                penaltyAmount={12000}
                message={"💉 Your pet is ill, visit veterinarian 💉"}
              />
            </div>
            <div className="cell-v cell-34">
              <Revenge
                player1={Player1}
                player2={Player2}
                activePlayer={activePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                locCell={34}
              />
            </div>
            <div className="cell-v cell-33">
              <StockSell
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={33}
                selectedButtons={selectedButtons}
                stockPrice={15000}
              />
            </div>
            <div className="cell-v cell-32 cell-corner-bottom-left inner-corner">
              💵 Payday 💵
            </div>
          </div>

          <div className="row row-1">
            <div className="cell-h cell-31">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={31}
                cost={5000}
                title={"Exemption"}
                message={"🎫 Buy Exemption Card! 🎫"}
              />
            </div>
            <div className="cell-h cell-30">
              <Penalty
                isAutoActive={isAutoActive}
                setAutoActive={setAutoActive}
                isExcemptionActive={isExcemptionActive}
                setExemptionActive={setExemptionActive}
                isShareActive={isShareActive}
                setShareActive={setActivePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={30}
                penaltyAmount={10000}
                message={"🩺 Undergone health check up 🩺"}
              />
            </div>
            <div className="cell-h cell-29">
              <Revenge
                player1={Player1}
                player2={Player2}
                activePlayer={activePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                locCell={29}
              />
            </div>
            <div className="cell-h cell-28">
              <Reward
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={28}
                message={"🎉 You captured escaped lion! Collect $4000! 🎉"}
                rewardAmount={4000}
              />
            </div>
            <div className="cell-h cell-27">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={27}
                cost={5000}
                title={"Stock"}
                message={"💹 Buy stock tokens! 💹"}
              />
            </div>
          </div>

          <div className="col col-2">
            <div className="cell-v cell-21 cell-corner-top-right">
              💵 Payday 💵
            </div>
            <div className="cell-v cell-22">
              <StockSell
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={22}
                selectedButtons={selectedButtons}
                stockPrice={10000}
              />
            </div>
            <div className="cell-v cell-23">
              <Reward
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={23}
                message={"🎉 Received job bonus! Collect $2500! 🎉"}
                rewardAmount={2500}
              />
            </div>
            <div className="cell-v cell-24">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={24}
                cost={3000}
                title={"Share Penalty Wealth"}
                message={"🤝 Buy Share Penalty Wealth Card! 🤝"}
              />
            </div>
            <div className="cell-v cell-25">
              <Penalty
                isAutoActive={isAutoActive}
                setAutoActive={setAutoActive}
                isExcemptionActive={isExcemptionActive}
                setExemptionActive={setExemptionActive}
                isShareActive={isShareActive}
                setShareActive={setActivePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={25}
                penaltyAmount={15000}
                message={"🎓 Took a university course 🎓"}
              />
            </div>
            <div className="cell-v cell-26 cell-corner-bottom-right inner-corner">
              💵 Payday 💵
            </div>
          </div>

          <div className="row row-2">
            <div className="cell-h cell-17">
              <Revenge
                player1={Player1}
                player2={Player2}
                activePlayer={activePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                locCell={17}
              />
            </div>
            <div className="cell-h cell-18">
              <Penalty
                isAutoActive={isAutoActive}
                setAutoActive={setAutoActive}
                isExcemptionActive={isExcemptionActive}
                setExemptionActive={setExemptionActive}
                isShareActive={isShareActive}
                setShareActive={setActivePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={18}
                penaltyAmount={25000}
                message={"🏢 Apartment Renovation 🏢"}
              />
            </div>
            <div className="cell-h cell-19">
              <Reward
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={19}
                message={
                  "🎉 Bussiness generates hefty returns! Collect $6500! 🎉"
                }
                rewardAmount={6500}
              />
            </div>
            <div className="cell-h cell-20">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={20}
                cost={5000}
                title={"Stock"}
                message={"💹 Buy stock tokens! 💹"}
              />
            </div>
          </div>

          <div className="col col-3">
            <div className="cell-v cell-16 cell-corner-top-left">
              💵 Payday 💵
            </div>
            <div className="cell-v cell-15">
              <StockSell
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={15}
                selectedButtons={selectedButtons}
                stockPrice={13000}
              />
            </div>
            <div className="cell-v cell-14">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={14}
                cost={5000}
                title={"Exemption"}
                message={"🎫 Buy Exemption Card! 🎫"}
              />
            </div>
            <div className="cell-v cell-13">
              <Revenge
                player1={Player1}
                player2={Player2}
                activePlayer={activePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                locCell={13}
              />
            </div>
            <div className="cell-v cell-12 cell-corner-bottom-left inner-corner">
              💵 Payday 💵
            </div>
          </div>

          <div className="row row-3">
            <div className="cell-h cell-11">
              <Penalty
                isAutoActive={isAutoActive}
                setAutoActive={setAutoActive}
                isExcemptionActive={isExcemptionActive}
                setExemptionActive={setExemptionActive}
                isShareActive={isShareActive}
                setShareActive={setActivePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={11}
                penaltyAmount={25000}
                message={"💸 Lost money in Gambling 💸"}
              />
            </div>
            <div className="cell-h cell-10">
              <Reward
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={10}
                message={
                  "🎉 Received grants for social work! Collect $2500! 🎉"
                }
                rewardAmount={2500}
              />
            </div>
            <div className="cell-h cell-9">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={9}
                cost={3000}
                title={"Share Penalty Wealth"}
                message={"🤝 Buy Share Penalty Wealth Card! 🤝"}
              />
            </div>
          </div>

          <div className="col col-4">
            <div className="cell-v cell-5 cell-corner-top-right inner-corner">
              💵 Payday 💵
            </div>
            <div className="cell-v cell-6">
              <StockSell
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={6}
                selectedButtons={selectedButtons}
                stockPrice={12000}
              />
            </div>
            <div className="cell-v cell-7">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={7}
                cost={3000}
                title={"Auto Insurance"}
                message={"🚗 Buy auto insurance! 🚗"}
              />
            </div>
            <div className="cell cell-v cell-8 cell-corner-bottom-right inner-corner">
              💵 Payday 💵
            </div>
          </div>

          <div className="row row-4">
            <div className="cell cell-h cell-3">
              <BonusCards
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={3}
                cost={5000}
                title={"Stock"}
                message={"💹 Buy stock tokens! 💹"}
              />
            </div>
            <div className="cell cell-h cell-4">
              <Penalty
                isAutoActive={isAutoActive}
                setAutoActive={setAutoActive}
                isExcemptionActive={isExcemptionActive}
                setExemptionActive={setExemptionActive}
                isShareActive={isShareActive}
                setShareActive={setActivePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={4}
                penaltyAmount={10000}
                message={"🎁 Brought gift for parents 🎁"}
              />
            </div>
          </div>

          <div className="col col-5">
            <div className="cell cell-v cell-2 cell-corner-top-left inner-corner">
              💵 Payday 💵
            </div>
            <div className="cell cell-v cell-1">
              <Reward
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={1}
                message={"🎉 You won a lottery! Collect $5000 🎉"}
                rewardAmount={5000}
              />
            </div>
            <div className="cell cell-v cell-0 start-cell">Start Game! 🏁</div>
          </div>
        </div>

        <div className="Right-Col">
          <div className="Scale">
            <div>Stock scale</div>
            <button className="scale scale1" onClick={handleButtonClick(1)}>
              1
            </button>
            <button className="scale scale2" onClick={handleButtonClick(2)}>
              2
            </button>
            <button className="scale scale3" onClick={handleButtonClick(3)}>
              3
            </button>
            <button className="scale scale4" onClick={handleButtonClick(4)}>
              4
            </button>
            <button className="scale scale5" onClick={handleButtonClick(5)}>
              5
            </button>
            <button className="scale scale6" onClick={handleButtonClick(6)}>
              6
            </button>
          </div>

          <div>
            <ProfessionPicker
              isAutoActive={isAutoActive}
              isExcemptionActive={isExcemptionActive}
              isStockActive={isStockActive}
              isShareActive={isShareActive} //remove
              count={count}
              player1={Player1}
              player2={Player2}
              setCount={setCount} //remove
              setPlayer1={setPlayer1}
              setPlayer2={setPlayer2}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePage;
