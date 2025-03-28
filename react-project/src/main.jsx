import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "https://github.com/Riyaa-tech/GameOfLife/blob/main/react-project/src/index.css";
import App from "https://github.com/Riyaa-tech/GameOfLife/blob/main/react-project/src/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
