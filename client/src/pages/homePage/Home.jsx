import React from "react";
import "./home.css";
import SearchForm from "../../components/searchForm/SearchForm";
import Pizzas from "../../components/pizzas/Pizzas";

import { useGlobalPizzasContext } from "../../context/pizzasContext";

const Home = () => {
  const { pizzasState } = useGlobalPizzasContext();

  

  return (
    <div>
      <SearchForm />
      <Pizzas />
    </div>
  );
};

export default Home;
