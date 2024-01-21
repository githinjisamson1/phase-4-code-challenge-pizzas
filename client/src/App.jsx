import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/homePage/Home";
import About from "./pages/aboutPage/About";
import Error from "./pages/errorPage/Error";
import Navbar from "./components/navbar/Navbar";
import SinglePizza from "./pages/singlePizzaPage/SinglePizza";

const App = () => {
  return (
    <div>
      {/* Navbar appears on all pages */}
      <Navbar/>

      {/* routes */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/pizzas/:id" element={<SinglePizza />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
