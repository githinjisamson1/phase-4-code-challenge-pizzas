import React, { useEffect } from "react";
import "./pizzas.css";
import { useGlobalPizzasContext } from "../../context/pizzasContext";
import Pizza from "../pizza/Pizza";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const Pizzas = () => {
  // provide PizzasContext
  const { pizzasState, dispatchForPizzas, searchTerm } =
    useGlobalPizzasContext();

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
        // console.log(data);

        // load for 1 sec
        setTimeout(() => {
          dispatchForPizzas({ type: "FETCH_SUCCESS", payload: data });
        }, 1000);
      })
      .catch((error) => {
        dispatchForPizzas({ type: "FETCH_FAILURE", payload: error.message });
      });
  };

  // run useEffect on initial render/once => pass empty dependency array
  useEffect(() => {
    fetchAllPizzas();
  }, []);

  // linear progress indeterminate to spice up loading
  if (pizzasState.loading) {
    return (
      <Stack sx={{ width: "100%", color: "grey.500", mt: "5rem" }} spacing={2}>
        <LinearProgress color="secondary" />
        <LinearProgress color="success" />
        <LinearProgress color="inherit" />
      </Stack>
    );
  }

  // initialize
  let filteredPizzas = [];

  // if user provides searchTerm
  if (searchTerm) {
    // if pizzas is not empty
    if (pizzasState.pizzas) {
      pizzasState.pizzas.map((pizza) => {
        if (pizza.name.toLowerCase() === searchTerm.toLowerCase()) {
          // append to the list of filteredPizzas in case of match
          filteredPizzas.push(pizza);
        }
        return null;
      });
    }
  } else {
    // user has not provided searchTerm/default list of pizzas
    filteredPizzas = pizzasState.pizzas;
  }

  console.log(filteredPizzas);

  return (
    <div className="pizzas">
      {/* {pizzasState.pizzas &&
        pizzasState.pizzas.map((pizza) => {
          return <Pizza key={pizza.id} {...pizza} />;
        })} */}

      {/* iterate pizzas + prop drill pizza attributes*/}
      {filteredPizzas.length > 0 &&
        filteredPizzas.map((pizza) => {
          return <Pizza key={pizza.id} {...pizza} />;
        })}
    </div>
  );
};

export default Pizzas;
