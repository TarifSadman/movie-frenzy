import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import "./components/styles/globals.scss";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/details">
          <DetailsPage />
        </Route>

        <Route path="/:category">
          <MainPage />
        </Route>

        <Route path="/">
          <MainPage />
        </Route>
        <Route path="/my-profile">
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}
