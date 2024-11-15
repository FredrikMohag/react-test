import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Se till att filen App.jsx finns och är korrekt exporterat

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
