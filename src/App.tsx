import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/header";
import Characters from "./screens/characters/characters";
import Biography from "./screens/biography/biography";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route path="/biography/:id">
            <Biography />
          </Route>
          <Route path="/">
            <Characters />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
