import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./GamePage";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/App" element={<GamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
