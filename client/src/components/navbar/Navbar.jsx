import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // set styles based on isActive boolean flag passed from NavLink
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
          <NavLink to="/">The Pizza Inn</NavLink>
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
