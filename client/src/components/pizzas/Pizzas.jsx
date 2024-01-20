import React, { useCallback, useEffect } from "react";
import "./pizzas.css";
import { useGlobalPizzasContext } from "../../context/pizzasContext";

const Pizzas = () => {
  // provide PizzasContext
  const { searchTerm, pizzasState, dispatchForPizzas } =
    useGlobalPizzasContext();

  // function to fetch pizzas
  // useCallback to prevent creating it from scratch
  const fetchPizzas = useCallback(() => {
    dispatchForPizzas({ type: "FETCH_REQUEST" });

    // fetch API
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
        dispatchForPizzas({ type: "FETCH_FAILURE", payload: error });
      });
  }, [searchTerm]);

  // run useEffect everytime searchTerm changes
  useEffect(() => {
    fetchPizzas();
  }, [searchTerm, fetchPizzas]);

  return <div>Pizzas</div>;
};

export default Pizzas;
