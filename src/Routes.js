import React from "react";
import FlightSearch from "./flightSearch/FlightSearch";
import Success from "./success/Sucess";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppProvider from "./appContext/AppProvider";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/success">
          <AppProvider>
             <Success />
          </AppProvider>
        </Route>
        <Route path="/">
          <AppProvider>
            <FlightSearch />
          </AppProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
