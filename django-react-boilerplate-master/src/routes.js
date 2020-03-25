import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";

import NetworkLogs from "./containers/NetworkLogs";
import Dashboard from "./containers/Dashboard";
import Visualisations from "./containers/Visualisations";
import Notifications from "./containers/Notifications";

const BaseRouter = (routerProps) => (
  <Hoc>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/networkLogs" render={(props) => <NetworkLogs {...props} chatSocket={routerProps.chatSocket} />} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/visualisations" component={Visualisations} />
    <Route path="/notifications" render={(props) => <Notifications {...props} notifList={routerProps.notifList} />} />
    <Route exact path="/" component={HomepageLayout} />
  </Hoc>
);

export default BaseRouter;
