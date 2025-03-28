import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./Images/bgImage.png";
import lifeLogo from "./Images/lifeLogo.png";
import "./HomePage.css";

const FormPage = () => {
  const [formData, setFormData] = useState({
    player1_name: "Player 1",
    player2_name: "Player 2",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/App", { state: formData }); // Passing form data via state
  };

  return (
    <div className="fullScreen">
      <img src={bgImage} alt="bgImage" className="image" />
      <div className="card-form">
        <img src={lifeLogo} alt="logo" className="logo" />
        <form onSubmit={handleSubmit}>
          <br />

          <div>
            <label>Player 1 name:</label>
            <input
              type="text"
              id="message"
              name="player1_name"
              row="1"
              placeholder="Enter Player 1 Name..."
              value={formData.name}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </div>
          <br />
          <div>
            <label>Player 2 name:</label>
            <input
              type="text"
              id="message"
              name="player2_name"
              row="1"
              placeholder="Enter Player 2 Name..."
              value={formData.name}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
              required
            />
          </div>
          <br />
          <br />
          <div>
            <button type="submit">Start the Game!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
