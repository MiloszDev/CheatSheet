// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import UploadingCheatSheet from "./components/UploadingCheatSheet";
import Chatbot from "./components/Chatbot";
import CheatSheetDetail from "./components/CheatSheetDetail";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar will be rendered on every page */}
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Cheat Sheets List */}
          <Route path="/upload" element={<UploadingCheatSheet />} />{" "}
          {/* Upload Cheat Sheet */}
          <Route path="/chatbot" element={<Chatbot />} /> {/* Chatbot Page */}
          <Route path="/cheatsheet/:id" element={<CheatSheetDetail />} />{" "}
          {/* Cheat Sheet Details */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
