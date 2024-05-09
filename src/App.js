import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import MainPage from "./components/MainPage/MainPage";
import "./components/styles/globals.scss";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/details">
          <DetailsPage />
        </Route>

        <Route path="/my-profile">
        <Profile />
        </Route>

        <Route path="/:category">
          <MainPage />
        </Route>

        <Route path="/movies">
          <MainPage />
        </Route>

        <Route path="/">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}
