import "./GamePage.css";

const Profile1 = ({ Player1, name }) => {
  return (
    <div className="Profile-1">
      <h2 className="PlayerName">{name}</h2>
      <h3>Profession: {Player1.profession}</h3>
      <h3>Amount: {Player1.amount}</h3>

      <div className="Options">
        <button className="OptionButton">
          Stock
          <br />
          Insurance <br /> {Player1.stockCards}
        </button>
        <button className="OptionButton">
          Auto
          <br />
          Insurance <br /> {Player1.autoCards}
        </button>
        <button className="OptionButton">
          Share Wealth <br /> {Player1.shareWealthCard}
        </button>
        <button className="OptionButton">
          Exemption <br /> {Player1.exemptionCard}
        </button>
      </div>
    </div>
  );
};

export default Profile1;
