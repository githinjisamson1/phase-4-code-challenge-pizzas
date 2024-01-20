import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      textDecoration: isActive ? "underline" : "none",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "goldenrod" : "white",
    };
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <NavLink to="/">The Pizza DB</NavLink>
        </h1>
      </div>

      <div className="navigation-links">
        <NavLink style={navLinkStyles} to="/">
          Home
        </NavLink>
        <NavLink style={navLinkStyles} to="/about">
          About
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
