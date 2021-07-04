import React from "react";
import FlightSearch from "./flightSearch/FlightSearch";
import Success from "./success/Sucess";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/success">
           <Success />
        </Route>
        <Route path="/">
          <FlightSearch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
