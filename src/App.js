import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import MainPage from "./components/Home/Main";
import "./App.css";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/register" element={<Register />} />
        <Route  exact path= "/"  element={<MainPage />}  />
        <Route  path= "/Login" element={<Login />}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

