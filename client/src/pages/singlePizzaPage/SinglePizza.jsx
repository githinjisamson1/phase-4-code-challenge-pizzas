import React, { useCallback, useEffect, useState } from "react";
import "./singlePizza.css";
import { useParams } from "react-router-dom";

const SinglePizza = () => {
  // destructure id
  const { id } = useParams();

  // state for singlePizza
  const [singlePizzaState, setSinglePizzaState] = useState({});

  // function to get single pizza
  // useCallback to prevent creating the function from scratch
  // "proxy": "http://127.0.0.1:5555"
  //

  const fetchSinglePizza = useCallback(() => {
    fetch(`/pizzas/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSinglePizzaState(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  // run side effect everytime id changes
  useEffect(() => {
    fetchSinglePizza();
  }, [id, fetchSinglePizza]);

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
      {/* short circuit */}
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
