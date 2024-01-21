import React from "react";
import "./error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1 className="error-msg">Oopsie! Could not find resource!</h1>
      <button
        className="error-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Back Home
      </button>
    </div>
  );
};

export default Error;
