import React from "react";
import "./home.css";
import SearchForm from "../../components/searchForm/SearchForm";
import Pizzas from "../../components/pizzas/Pizzas";


const Home = () => {
  return (
    <div>
      <SearchForm />
      <Pizzas />
    </div>
  );
};

export default Home;
