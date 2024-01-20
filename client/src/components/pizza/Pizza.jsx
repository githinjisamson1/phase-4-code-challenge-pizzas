import React from "react";
import "./pizza.css";

// inline props destructuring
const Pizza = ({ name, ingredients }) => {
  return (
    <div className="pizza">
      <img
        src="https://i.pinimg.com/474x/a5/dd/0f/a5dd0f598b0ad28b56444e88bdb8fd7a.jpg"
        alt={name}
      />
      <div className="info">
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <button className="details">Details</button>
      </div>
    </div>
  );
};

export default Pizza;
