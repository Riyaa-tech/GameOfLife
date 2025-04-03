import ProfessionPicker from "./Profession-Picker.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Wheel from "./Wheel.jsx";
import Reward from "./Reward.jsx";
import Revenge from "./Revenge.jsx";
import BonusCards from "./BonusCards.jsx";
import StockSell from "./StockSell.jsx";
import Penalty from "./Penalty.jsx";
import AutoPenalty from "./AutoPenalty.jsx";
import greenPin from "./Images/greenPin.png";
import bluePin from "./Images/bluePin.png";
import "./GamePage.css";

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

      console.log(
        `Payday triggered for Player 1! Received: $${
          additionalPaydays * Player1.salary
        }`
      );
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

      console.log(
        `Payday triggered for Player 2! Received: $${
          additionalPaydays * Player2.salary
        }`
      );
    }
  }, [Player2, activePlayer, loc2]);

  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (buttonNumber) => {
      setSelectedButtons((selectedButtons) => {
        if (selectedButtons.includes(buttonNumber)) {
          return selectedButtons.filter((num) => num !== buttonNumber); // Remove if already selected
        }if (selectedButtons.length < 2) {
          return [...selectedButtons, buttonNumber]; // Add if less than 2 are selected
        }
        return selectedButtons;
      });
  };

  return (
    <>
      <div className="FullPage">
        <div className="ProfileDisplay">
          <div className="Profile-1">
            <div style={{display: "flex"}}>
            <img src={bluePin} alt="" style={{height: "32px", width: "32px", marginTop: "10px"}}/>
            <h2 className="PlayerName">{Player1.name}</h2>
            </div>
            <h3>
              Profession: {Player1.profession}
              <br />
              Salary: $ {Player1.salary.toLocaleString()}
              <br />
              Amount: $ {Player1.amount.toLocaleString()}
            </h3>

            <div className="Options">
              <button
                className="OptionButton stockInsurance "
                disabled={Player1.stockCards > 0 ? false : true}
              >
                Stock
                <br />
                tokens <br /> {Player1.stockCards}
              </button>
              <button
                className="OptionButton autoInsurance"
                disabled={Player1.autoCards > 0 ? false : true}
              >
                Auto
                <br />
                Insurance <br /> {Player1.autoCards}
              </button>
              <button
                className="OptionButton shareWealthCard"
                disabled={Player1.shareWealthCard > 0 ? false : true}
              >
                Share Wealth <br /> {Player1.shareWealthCard}
              </button>
              <button
                className="OptionButton exemptionCard"
                disabled={Player1.exemptionCard > 0 ? false : true}
              >
                Exemption <br /> {Player1.exemptionCard}
              </button>
            </div>
          </div>

          <div className="Profile-2">
            <div style={{display: "flex"}}>
            <img src={greenPin} alt="" style={{height: "32px", width: "32px", marginTop: "10px"}}/>
            <h2 className="PlayerName">{Player2.name}</h2>
            </div>
            <h3>
              Profession: {Player2.profession}
              <br />
              Salary: $ {Player2.salary.toLocaleString()}
              <br />
              Amount: $ {Player2.amount.toLocaleString()}
            </h3>

            <div className="Options">
              <button
                className="OptionButton stockInsurance "
                disabled={Player2.stockCards > 0 ? false : true}
              >
                Stock
                <br />
                tokens <br /> {Player2.stockCards}
              </button>
              <button
                className="OptionButton autoInsurance"
                disabled={Player2.autoCards > 0 ? false : true}
              >
                Auto
                <br />
                Insurance <br /> {Player2.autoCards}
              </button>
              <button
                className="OptionButton shareWealthCard"
                disabled={Player2.shareWealthCard > 0 ? false : true}
              >
                Share Wealth <br /> {Player2.shareWealthCard}
              </button>
              <button
                className="OptionButton exemptionCard"
                disabled={Player2.exemptionCard > 0 ? false : true}
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
            <div className="cell-v cell-37 end-cell">
              <h4>Retirement 🏡</h4>
            </div>
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
                message={"🎉 Won singing contest! Collect $5,000! 🎉"}
                rewardAmount={5000}
              />
              <img src={bluePin} alt="" className="img1 img1-36" />
              <img src={greenPin} alt="" className="img2 img2-36" />
            </div>
            <div className="cell-v cell-35">
              <AutoPenalty
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={35}
                penaltyAmount={15000}
                message={"🚨 Car repair! Pay $15,000 🚨"}
              />
              <img src={bluePin} alt="" className="img1 img1-35" />
              <img src={greenPin} alt="" className="img2 img2-35" />
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
              <img src={bluePin} alt="" className="img1 img1-34" />
              <img src={greenPin} alt="" className="img2 img2-34" />
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
              <img src={bluePin} alt="" className="img1 img1-33" />
              <img src={greenPin} alt="" className="img2 img2-33" />
            </div>
            <div className="cell-v cell-32 cell-corner-bottom-left inner-corner">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-32" />
            <img src={greenPin} alt="" className="img2 img2-32" />
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
              <img src={bluePin} alt="" className="img1 img1-31" />
              <img src={greenPin} alt="" className="img2 img2-31" />
            </div>
            <div className="cell-h cell-30">
              <Penalty
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={30}
                penaltyAmount={10000}
                message={"🩺 Undergone health check up! Pay $10,000 🩺"}
              />
              <img src={bluePin} alt="" className="img1 img1-30" />
              <img src={greenPin} alt="" className="img2 img2-30" />
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
              <img src={bluePin} alt="" className="img1 img1-29" />
              <img src={greenPin} alt="" className="img2 img2-29" />
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
              <img src={bluePin} alt="" className="img1 img1-28" />
              <img src={greenPin} alt="" className="img2 img2-28" />
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
              <img src={bluePin} alt="" className="img1 img1-27" />
              <img src={greenPin} alt="" className="img2 img2-27" />
            </div>
          </div>

          <div className="col col-2">
            <div className="cell-v cell-21 cell-corner-top-right">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-21" />
            <img src={greenPin} alt="" className="img2 img2-21" />
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
              <img src={bluePin} alt="" className="img1 img1-22" />
              <img src={greenPin} alt="" className="img2 img2-22" />
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
                message={"🎉Received job bonus! Collect $2500!🎉"}
                rewardAmount={2500}
              />
              <img src={bluePin} alt="" className="img1 img1-23" />
              <img src={greenPin} alt="" className="img2 img2-23" />
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
              <img src={bluePin} alt="" className="img1 img1-24" />
              <img src={greenPin} alt="" className="img2 img2-24" />
            </div>
            <div className="cell-v cell-25">
              <AutoPenalty
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={25}
                penaltyAmount={10000}
                message={"🚨 Car repair! Pay $10,000 🚨"}
              />
              <img src={bluePin} alt="" className="img1 img1-25" />
              <img src={greenPin} alt="" className="img2 img2-25" />
            </div>
            <div className="cell-v cell-26 cell-corner-bottom-right inner-corner">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-26" />
            <img src={greenPin} alt="" className="img2 img2-26" />
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
              <img src={bluePin} alt="" className="img1 img1-17" />
              <img src={greenPin} alt="" className="img2 img2-17" />
            </div>
            <div className="cell-h cell-18">
              <Penalty
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={18}
                penaltyAmount={25000}
                message={"🏢 Apartment Renovation! Pay $25,000 🏢"}
              />
              <img src={bluePin} alt="" className="img1 img1-18" />
              <img src={greenPin} alt="" className="img2 img2-18" />
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
              <img src={bluePin} alt="" className="img1 img1-19" />
              <img src={greenPin} alt="" className="img2 img2-19" />
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
              <img src={bluePin} alt="" className="img1 img1-20" />
              <img src={greenPin} alt="" className="img2 img2-20" />
            </div>
          </div>

          <div className="col col-3">
            <div className="cell-v cell-16 cell-corner-top-left">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-16" />
            <img src={greenPin} alt="" className="img2 img2-16" />
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
              <img src={bluePin} alt="" className="img1 img1-15" />
              <img src={greenPin} alt="" className="img2 img2-15" />
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
              <img src={bluePin} alt="" className="img1 img1-14" />
              <img src={greenPin} alt="" className="img2 img2-14" />
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
              <img src={bluePin} alt="" className="img1 img1-13" />
              <img src={greenPin} alt="" className="img2 img2-13" />
            </div>
            <div className="cell-v cell-12 cell-corner-bottom-left inner-corner">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-12" />
            <img src={greenPin} alt="" className="img2 img2-12" />
            </div>
          </div>

          <div className="row row-3">
            <div className="cell-h cell-11">
              <Penalty
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                activePlayer={activePlayer}
                player1={Player1}
                player2={Player2}
                loc1={loc1}
                loc2={loc2}
                loc_cell={11}
                penaltyAmount={25000}
                message={"💸 Lost money in Gambling! Pay $25,000 💸"}
              />
              <img src={bluePin} alt="" className="img1 img1-11" />
              <img src={greenPin} alt="" className="img2 img2-11" />
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
              <img src={bluePin} alt="" className="img1 img1-10" />
              <img src={greenPin} alt="" className="img2 img2-10" />
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
              <img src={bluePin} alt="" className="img1 img1-9" />
              <img src={greenPin} alt="" className="img2 img2-9" />
            </div>
          </div>

          <div className="col col-4">
            <div className="cell-v cell-5 cell-corner-top-right inner-corner">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-5" />
            <img src={greenPin} alt="" className="img2 img2-5" />
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
              <img src={bluePin} alt="" className="img1 img1-6" />
              <img src={greenPin} alt="" className="img2 img2-6" />
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
              <img src={bluePin} alt="" className="img1 img1-7" />
              <img src={greenPin} alt="" className="img2 img2-7" />
            </div>
            <div className="cell cell-v cell-8 cell-corner-bottom-right inner-corner">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-8" />
            <img src={greenPin} alt="" className="img2 img2-8" />
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
              <img src={bluePin} alt="" className="img1 img1-3" />
              <img src={greenPin} alt="" className="img2 img2-3" />
            </div>
            <div className="cell cell-h cell-4">
              <Penalty
                activePlayer={activePlayer}
                setPlayer1={setPlayer1}
                setPlayer2={setPlayer2}
                loc1={loc1}
                loc2={loc2}
                player1={Player1}
                player2={Player2}
                loc_cell={4}
                penaltyAmount={12000}
                message={"🎓 Took a hacking course! Pay $12,000 🎓"}
              />
              <img src={bluePin} alt="" className="img1 img1-4" />
              <img src={greenPin} alt="" className="img2 img2-4" />
            </div>
          </div>

          <div className="col col-5">
            <div className="cell cell-v cell-2 cell-corner-top-left inner-corner">
              <h4>💵 Payday 💵</h4>
              <img src={bluePin} alt="" className="img1 img1-2" />
            <img src={greenPin} alt="" className="img2 img2-2" />
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
              <img src={bluePin} alt="" className="img1 img1-1" />
              <img src={greenPin} alt="" className="img2 img2-1" />
            </div>
            <div className="cell cell-v cell-0 start-cell active-cell"><h4>Start Game! 🏁</h4></div>
          </div>
        </div>

        <div className="Right-Col">
          <div className="Scale">
            <div>Stock scale</div>
            <div>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            className="scale"
            onClick={() => handleButtonClick(num)}
            style={{border: selectedButtons.includes(num) ? "3px solid black" : "", outline: selectedButtons.includes(num) ? "1px solid white" : ""}}
          >
            {num}
          </button>
        ))}
      </div>
          </div>

          <div>
            <ProfessionPicker
              count={count}
              player1={Player1}
              player2={Player2}
              setCount={setCount}
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
