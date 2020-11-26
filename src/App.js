import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Axios from "axios";

import UserContext from "./context/UserContext";

import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Login from "./components/Pages/Authentication/Login/Login";
import Register from "./components/Pages/Authentication/Register/Register";

import Header from "./components/Layout/Header/Header";

import "./stylesheets/main.scss";

const App = () => {
  const [user, setUser] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    /**
     * Check to see if user is logged in.
     */

    const checkUser = async () => {
      const token = localStorage["authentication-token"] || "";

      const response = await Axios.post(`${process.env.REACT_APP_API_URL}/users/token/valid`, null, {
        headers: {
          "x-authentication-token": token,
        },
      });

      if (!response.data) return;

      // Not named `user` due to the state variable name.
      const _user = await Axios.get(`${process.env.REACT_APP_API_URL}/users`, {
        headers: {
          "x-authentication-token": token,
        },
      });

      setUser({
        token,
        user: _user.data,
      });
    };

    checkUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
