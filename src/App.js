import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthenticationProvider } from "./context/AuthenticationContext";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./components/Pages/Home/Home";
import Test from "./components/Pages/Test/Test";
import Login from "./components/Pages/Authentication/Login/Login";
import Register from "./components/Pages/Authentication/Register/Register";

import Header from "./components/Layout/Header/Header";

import "./stylesheets/main.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthenticationProvider>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <ProtectedRoute path="/test" component={Test} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={() => "404"} />
          </Switch>
        </AuthenticationProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
