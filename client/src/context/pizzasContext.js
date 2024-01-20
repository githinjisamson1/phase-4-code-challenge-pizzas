import React, { useContext, useReducer } from "react";

// PizzasContext => returns {Provider,  Consumer}
const PizzasContext = React.createContext();

// PizzasProvider
export const PizzasProvider = ({ children }) => {
  // initialPizzasState
  const initialPizzasState = {
    loading: false,
    pizzas: [],
    error: "",
  };

  // pizzasReducer to switcth through action types
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

      default:
        return state;
    }
  };

  // useReducer => returns [state, dispatch]
  const [pizzasState, dispatchForPizzas] = useReducer(
    pizzasReducer,
    initialPizzasState
  );

  // wrap return in Provider
  return (
    <PizzasContext.Provider value={{ pizzasState, dispatchForPizzas }}>
      {children}
    </PizzasContext.Provider>
  );
};

// useGlobalPizzasContext can be accessd globally
export const useGlobalPizzasContext = () => {
  return useContext(PizzasContext);
};
