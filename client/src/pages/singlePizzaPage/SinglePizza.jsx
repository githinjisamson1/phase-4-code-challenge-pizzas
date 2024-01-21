import React, { useCallback, useEffect, useState } from "react";
import "./singlePizza.css";
import { useParams } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
// import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const SinglePizza = () => {
  // destructure id
  const { id } = useParams();

  // state for singlePizza
  const [singlePizzaState, setSinglePizzaState] = useState({});
  const [loading, setLoading] = useState(true);

  // function to get single pizza
  // useCallback to prevent creating the function from scratch
  // "proxy": "http://127.0.0.1:5555"

  const fetchSinglePizza = useCallback(() => {
    setLoading(loading);

    // fetch API - 1
    fetch(`/pizzas/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data) {
          setSinglePizzaState(data);
        }

        // load for 1.5 sec
        setTimeout(() => {
          setLoading(!loading);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setLoading(!loading);
      });
  }, [id]);

  // run side effect everytime id changes
  useEffect(() => {
    fetchSinglePizza();
  }, [id, fetchSinglePizza]);

  // linear progress indeterminate to spice up loading
  if (loading) {
    return (
      <Stack sx={{ width: "100%", color: "grey.500", mt: "5rem" }} spacing={2}>
        <LinearProgress color="secondary" />
        <LinearProgress color="success" />
        <LinearProgress color="inherit" />
      </Stack>
    );
  }

  // track restaurant_pizza
  let restaurant_pizza;

  // if singlePizzaState is not empty
  if (singlePizzaState && singlePizzaState.restaurant_pizzas) {
    console.log(singlePizzaState.restaurant_pizzas);

    // extract restaurant_pizzas
    const restaurant_pizzas = singlePizzaState.restaurant_pizzas;

    // find restaurant_pizza where pizza_id matches id
    restaurant_pizza = restaurant_pizzas.find((restaurant_pizza) => {
      return restaurant_pizza.pizza_id === Number(id);
    });
  }

  // track
  let price, restaurant, address;

  // if restaurant_pizza is not empty
  if (restaurant_pizza) {
    // extract price
    price = restaurant_pizza.price;
    restaurant = restaurant_pizza.restaurant.name;
    address = restaurant_pizza.restaurant.address;
  }

  return (
    <div className="single-pizza">
      {/* static image!!! */}
      <img
        src="https://i.pinimg.com/474x/a5/dd/0f/a5dd0f598b0ad28b56444e88bdb8fd7a.jpg"
        alt={singlePizzaState.name}
      />
      {/* conditional rendering/short circuit */}
      {singlePizzaState && (
        <div className="details">
          <p>
            <span>Name:</span> {singlePizzaState.name}
          </p>
          <p>
            <span>Ingredients:</span> {singlePizzaState.ingredients}
          </p>
          <p>
            <span>Price:</span> ${price}
          </p>
          <p>
            <span>Restaurant:</span> {restaurant}
          </p>
          <p>
            <span>Address:</span> {address}
          </p>
        </div>
      )}
    </div>
  );
};

export default SinglePizza;
