import React from "react";
import { Route, Switch } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import Home from "../components/Pages/Home/Home";
import Test from "../components/Pages/Test/Test";
import User from "../components/Pages/User/User";
import Login from "../components/Pages/Authentication/Login/Login";
import Register from "../components/Pages/Authentication/Register/Register";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <ProtectedRoute path="/test" component={Test} />
      <ProtectedRoute path="/user" component={User} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={() => "404"} />
    </Switch>
  );
};

export default Routes;
