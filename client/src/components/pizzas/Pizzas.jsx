import React, { useEffect } from "react";
import "./pizzas.css";
import { useGlobalPizzasContext } from "../../context/pizzasContext";
import Pizza from "../pizza/Pizza";

const Pizzas = () => {
  // provide PizzasContext
  const { pizzasState, dispatchForPizzas } = useGlobalPizzasContext();

  // function to fetch all pizzas
  const fetchAllPizzas = () => {
    dispatchForPizzas({ type: "FETCH_REQUEST" });

    // fetch API - all
    // "proxy": "http://127.0.0.1:5555"

    fetch("/pizzas")
      .then((response) => {
        // convert readableStream to JSON
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatchForPizzas({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((error) => {
        dispatchForPizzas({ type: "FETCH_FAILURE", payload: error.message });
      });
  };

  // run useEffect on initial render/once
  useEffect(() => {
    fetchAllPizzas();
  }, []);

  return (
    <div className="pizzas">
      {/* iterate pizzas + prop drill pizza attributes*/}
      {pizzasState.pizzas.map((pizza) => {
        return <Pizza key={pizza.id} {...pizza} />;
      })}
    </div>
  );
};

export default Pizzas;
