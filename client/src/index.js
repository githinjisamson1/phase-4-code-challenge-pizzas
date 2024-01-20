import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { PizzasProvider } from "./context/pizzasContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <PizzasProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PizzasProvider>
  </>
);
