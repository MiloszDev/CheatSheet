// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css"; // Make sure your styling is applied

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Cheat Sheets List</Link>
        </li>{" "}
        {/* Landing Page (Cheat Sheets List) */}
        <li>
          <Link to="/upload">Upload Cheat Sheet</Link>
        </li>{" "}
        {/* Uploading CheatSheet Page */}
        <li>
          <Link to="/chatbot">Chatbot</Link>
        </li>{" "}
        {/* Chatbot Page */}
      </ul>
    </nav>
  );
};

export default Navbar;
