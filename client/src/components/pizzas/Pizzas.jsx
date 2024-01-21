import React, { useEffect } from "react";
import "./pizzas.css";
import { useGlobalPizzasContext } from "../../context/pizzasContext";
import Pizza from "../pizza/Pizza";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

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
