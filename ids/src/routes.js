import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";

import NetworkLogs from "./containers/NetworkLogs";
import Dashboard from "./containers/Dashboard";

const BaseRouter = () => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/networkLogs" component={NetworkLogs} />
    <Route path="/dashboard" component={Dashboard} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
