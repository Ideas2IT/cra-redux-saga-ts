import * as React from "react";
import { Route, Switch } from "react-router";
import NavBar from "../components/NavBar";
import Counter from "../pages/Counter";
import Hello from "../pages/Hello";
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";
import User from "../pages/User";

const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/hello" component={Hello} />
      <Route path="/counter" component={Counter} />
      <Route path="/user" component={User} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default routes;
