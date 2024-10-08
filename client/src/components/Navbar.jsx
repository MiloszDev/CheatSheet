import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Cheat Sheets List</Link>
        </li>{" "}
        {}
        <li>
          <Link to="/upload">Upload Cheat Sheet</Link>
        </li>{" "}
        {}
        <li>
          <Link to="/chatbot">Chatbot</Link>
        </li>{" "}
        {}
      </ul>
    </nav>
  );
};

export default Navbar;
