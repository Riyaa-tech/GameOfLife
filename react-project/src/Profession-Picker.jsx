import React, { useState } from "react";
import "./GamePage.css";

const professions = [
  { title: "Doctor", salary: 50000 },
  { title: "Lawyer", salary: 50000 },
  { title: "Teacher", salary: 20000 },
  { title: "Chef", salary: 28000 },
  { title: "Physicist", salary: 30000 },
  { title: "Jounalist", salary: 24000 },
];

const ProfessionPicker = ({
  count,
  player1,
  player2,
  setCount,
  setPlayer1,
  setPlayer2,
}) => {
  const [showCard, setShowCard] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState(null);

  const assignProfessions = () => {
    if (isInactive) {
      alert(`Professions have already been assigned!`);
      return;
    }

    setCount(count + 1);
    const randomProf1 =
      professions[Math.floor(Math.random() * professions.length)];
    const randomProf2 =
      professions[Math.floor(Math.random() * professions.length)];

    setSelectedProfessions({
      player1: {
        ...player1,
        profession: randomProf1.title,
        salary: randomProf1.salary,
      },
      player2: {
        ...player2,
        profession: randomProf2.title,
        salary: randomProf2.salary,
      },
    });

    setIsInactive(true);
    setShowCard(true);
  };

  const confirmSelection = () => {
    if (selectedProfessions) {
      setPlayer1(selectedProfessions.player1);
      setPlayer2(selectedProfessions.player2);
    }
    setShowCard(false);
  };

  return (
    <>
      <div>
        <button
          id="ProfessionPickerButton"
          className="ProfessionPickerButton"
          onClick={assignProfessions}
          disabled={isInactive}
        >
          Profession
          <br />
          Picker
        </button>

        {showCard && selectedProfessions && (
          <div className="card">
            <div className="displayProfessionData">
              <div>
                <h1>{player1.name}</h1>
                <h2>
                  Profession: <br />
                  {selectedProfessions.player1.profession}
                </h2>
                <h2>
                  Salary: <br />
                  {selectedProfessions.player1.salary}
                </h2>
              </div>

              <div>
                <h1>{player2.name}</h1>
                <h2>
                  Profession: <br />
                  {selectedProfessions.player2.profession}
                </h2>
                <h2>
                  Salary: <br />
                  {selectedProfessions.player2.salary}
                </h2>
              </div>
            </div>
            <button onClick={confirmSelection}>Ok</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfessionPicker;
