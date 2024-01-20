import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import About from "./pages/aboutPage/About";
import Error from "./pages/errorPage/Error";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
