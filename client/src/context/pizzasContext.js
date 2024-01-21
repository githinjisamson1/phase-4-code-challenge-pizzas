import React, { useContext, useReducer, useState } from "react";

// PizzasContext => returns {Provider,  Consumer}
const PizzasContext = React.createContext();

// PizzasProvider
export const PizzasProvider = ({ children }) => {
  // initialPizzasState
  const initialPizzasState = {
    loading: true,
    pizzas: [],
    error: "",
  };

  const handleDeletePizza = (id) => {
    return pizzasState.pizzas.filter((pizza) => {
      return pizza.id !== Number(id);
    });
  };

  // pizzasReducer to switch through action types
  const pizzasReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return {
          ...state,
          loading: true,
          pizzas: [],
          error: "",
        };

      case "FETCH_SUCCESS":
        return {
          ...state,
          loading: false,
          pizzas: action.payload,
          error: "",
        };

      case "FETCH_FAILURE":
        return {
          ...state,
          loading: false,
          pizzas: [],
          error: action.payload,
        };

      case "REMOVE_PIZZA":
        return {
          ...state,
          loading: false,
          pizzas: handleDeletePizza(action.payload),
          error: "",
        };

      default:
        return state;
    }
  };

  // useReducer => returns [state, dispatch] === kind of resembles reducer()
  const [pizzasState, dispatchForPizzas] = useReducer(
    pizzasReducer,
    initialPizzasState
  );

  // state for searchTerm
  const [searchTerm, setSearchTerm] = useState("");

  // wrap return in Provider
  return (
    <PizzasContext.Provider
      value={{ pizzasState, dispatchForPizzas, searchTerm, setSearchTerm }}
    >
      {children}
    </PizzasContext.Provider>
  );
};

// useGlobalPizzasContext can be accessed globally
export const useGlobalPizzasContext = () => {
  return useContext(PizzasContext);
};
