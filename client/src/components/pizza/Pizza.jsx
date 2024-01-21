import React from "react";
import "./pizza.css";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// inline props destructuring
const Pizza = ({ id, name, ingredients }) => {
  // for changing location programmatically
  const navigate = useNavigate();

  return (
    <div className="pizza">
      {/* static image!!! */}
      <img
        src="https://i.pinimg.com/474x/a5/dd/0f/a5dd0f598b0ad28b56444e88bdb8fd7a.jpg"
        alt={name}
      />
      <div className="info">
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <div className="bottom">
          <button
            className="details"
            onClick={() => {
              navigate(`/pizzas/${id}`);
            }}
          >
            Details
          </button>
          <div className="edit-delete">
            <EditIcon
              sx={{ color: "#0077b6", cursor: "pointer", mr: "1rem" }}
            />
            <DeleteIcon
              onClick={() => {
                alert("🍕 Pizza deleted successfully!");
              }}
              sx={{ color: "#c1121f", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
