import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import MainPage from "./components/MainPage";
import "./components/styles/globals.scss";
import Profile from "./components/Profile";

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

        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </div>
  );
}
