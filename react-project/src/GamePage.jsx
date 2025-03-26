import ProfessionPicker from "./Profession-Picker.jsx";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Wheel from "./Wheel.jsx";
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
    shareWealthCard: 0,
    exemptionCard: 0,
    stockCards: 0,
    autoCards: 0,
    isActive: true,
  });

  const [Player2, setPlayer2] = useState({
    name: player2_name,
    profession: "",
    salary: 0,
    amount: 10000,
    shareWealthCard: 0,
    exemptionCard: 0,
    stockCards: 0,
    autoCards: 0,
    isActive: false,
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

  return (
    <>
      <div className="FullPage">
        <div className="ProfileDisplay">
          <div className="Profile-1">
            <h2 className="PlayerName">{Player1.name}</h2>
            <h3>
              Profession: {Player1.profession}
              <br />
              Salary: {Player1.salary}
              <br />
              Amount: {Player1.amount}
            </h3>

            <div className="Options">
              <button
                className="OptionButton stockInsurance "
                disabled={Player1.stockCards > 0 ? false : true}
                onClick={() => {
                  //add function if required
                  setStockActive(true);
                }}
              >
                Stock
                <br />
                Insurance <br /> {Player1.stockCards}
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
              Salary: {Player2.salary}
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
                Insurance <br /> {Player2.stockCards}
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
            <div className="cell-v cell-37 end-cell">cell 37</div>
            <div className="cell-v cell-36">cell 36</div>
            <div className="cell-v cell-35">cell 35</div>
            <div className="cell-v cell-34">cell 34</div>
            <div className="cell-v cell-33">cell 33</div>
            <div className="cell-v cell-32 cell-corner-bottom-left inner-corner">
              cell 32
            </div>
          </div>

          <div className="row row-1">
            <div className="cell-h cell-31">cell 31</div>
            <div className="cell-h cell-30">cell 30</div>
            <div className="cell-h cell-29">cell 29</div>
            <div className="cell-h cell-28">cell 28</div>
            <div className="cell-h cell-27">cell 27</div>
          </div>

          <div className="col col-2">
            <div className="cell-v cell-21 cell-corner-top-right">cell 21</div>
            <div className="cell-v cell-22">cell 22</div>
            <div className="cell-v cell-23">cell 23</div>
            <div className="cell-v cell-24">cell 24</div>
            <div className="cell-v cell-25">cell 25</div>
            <div className="cell-v cell-26 cell-corner-bottom-right inner-corner">
              cell 26
            </div>
          </div>

          <div className="row row-2">
            <div className="cell-h cell-17">cell 17</div>
            <div className="cell-h cell-18">cell 18</div>
            <div className="cell-h cell-19">cell 19</div>
            <div className="cell-h cell-20">cell 20</div>
          </div>

          <div className="col col-3">
            <div className="cell-v cell-16 cell-corner-top-left">cell 16</div>
            <div className="cell-v cell-15">cell 15</div>
            <div className="cell-v cell-14">cell 14</div>
            <div className="cell-v cell-13">cell 13</div>
            <div className="cell-v cell-12 cell-corner-bottom-left inner-corner">
              cell 12
            </div>
          </div>

          <div className="row row-3">
            <div className="cell-h cell-11">cell 11</div>
            <div className="cell-h cell-10">cell 10</div>
            <div className="cell-h cell-9">cell 9</div>
          </div>

          <div className="col col-4">
            <div className="cell-v cell-5 cell-corner-top-right inner-corner">
              cell 5
            </div>
            <div className="cell-v cell-6">cell 6</div>
            <div className="cell-v cell-7">cell 7</div>
            <div className="cell cell-v cell-8 cell-corner-bottom-right inner-corner">
              cell 8
            </div>
          </div>

          <div className="row row-4">
            <div className="cell cell-h cell-3">cell 3</div>
            <div className="cell cell-h cell-4">cell 4</div>
          </div>

          <div className="col col-5">
            <div className="cell cell-v cell-2 cell-corner-top-left inner-corner">
              cell 2
            </div>
            <div className="cell cell-v cell-1">cell 1</div>
            <div className="cell cell-v cell-0 start-cell">Start 0</div>
          </div>
        </div>

        <div className="Right-Col">
          <div className="Scale">
            <div>Stock scale</div>
            <button className="scale scale1">1</button>
            <button className="scale scale2">2</button>
            <button className="scale scale3">3</button>
            <button className="scale scale4">4</button>
            <button className="scale scale5">5</button>
            <button className="scale scale6">6</button>
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
