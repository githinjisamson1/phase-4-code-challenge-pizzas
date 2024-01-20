import React, { useContext } from "react";

const PizzaContext = React.createContext();

export const PizzaProvider = ({ children }) => {
  return <PizzaContext.Provider>{children}</PizzaContext.Provider>;
};

export const useGlobalPizzaContext = () => {
  return useContext(PizzaContext);
};
