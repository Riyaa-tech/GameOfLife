import { BrowserRouter as Router, Routes, Route } from "https://github.com/Riyaa-tech/GameOfLife/tree/main/node_modules/react-router-dom";
import GamePage from "https://github.com/Riyaa-tech/GameOfLife/blob/main/react-project/src//GamePage";
import HomePage from "https://github.com/Riyaa-tech/GameOfLife/blob/main/react-project/src/HomePage";

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
