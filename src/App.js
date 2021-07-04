import React from "react";
import FlightSearch from "./flightSearch/FlightSearch";
import Success from "./success/Sucess";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <FlightSearch />
        </Route>
        <Route path="/success">
          <FlightSearch />
           <Success />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
