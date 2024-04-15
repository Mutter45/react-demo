import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./main.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename="/react-demo">
      <App />
    </HashRouter>
  </React.StrictMode>
);
