import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./GamePage";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Router basename="/GameOfLife">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
