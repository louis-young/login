import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { AuthenticationProvider } from "./context/AuthenticationContext";

import Routes from "./routes/Routes";

import Header from "./components/Layout/Header/Header";

import "./stylesheets/main.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthenticationProvider>
          <Header />
          <Routes />
        </AuthenticationProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
