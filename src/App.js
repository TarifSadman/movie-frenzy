import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import "./components/styles/index.scss";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/details" element={<DetailsPage/>} />
        <Route path="/:category" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route exact path="/my-profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
