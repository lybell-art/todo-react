import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LocalStorageStore from "./store/localStorage.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App store={new LocalStorageStore()}/>
  </StrictMode>,
)
