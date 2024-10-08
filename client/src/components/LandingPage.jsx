import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/LandingPage.css";

const LandingPage = () => {
  const [cheatsheets, setCheatsheets] = useState([]);

  useEffect(() => {
    const fetchCheatSheets = async () => {
      const response = await axios.get("http://localhost:5000/api/cheatsheets");
      setCheatsheets(response.data);
    };
    fetchCheatSheets();
  }, []);

  return (
    <div className="container">
      <h1>List of Cheat Sheets</h1>
      <ul className="cheat-sheets-list">
        {cheatsheets.map((sheet) => (
          <li key={sheet.id}>
            <Link to={`/cheatsheet/${sheet.id}`}>{sheet.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LandingPage;
