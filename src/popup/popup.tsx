import React from "react";
import { Routes, Route } from "react-router-dom";
import "./popup.css";
import Home from "./components/Home";
import About from "./components/About";

const Popup = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Popup;
