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
        <Navbar /> {}
        <Routes>
          <Route path="/" element={<LandingPage />} /> {}
          <Route path="/upload" element={<UploadingCheatSheet />} /> {}
          <Route path="/chatbot" element={<Chatbot />} /> {}
          <Route path="/cheatsheet/:id" element={<CheatSheetDetail />} /> {}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
