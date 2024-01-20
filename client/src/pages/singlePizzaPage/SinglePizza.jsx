import React from "react";
import "./singlePizza.css";
import { useParams } from "react-router-dom";

const SinglePizza = () => {
  const { id } = useParams();
  return <div>SinglePizza {id}</div>;
};

export default SinglePizza;
