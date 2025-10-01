import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
import GetStartedButton from "./GetStartedButton";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <Link to="/log-in">Log in</Link>
        </li>
      </ul>
      <GetStartedButton />
   
     
    </nav>
  );
};

export default Navbar;
