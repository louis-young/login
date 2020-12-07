import React, { useContext } from "react";
import { Route } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

import Login from "../../components/Pages/Authentication/Login/Login";

const ProtectedRoute = ({ Component, ...rest }) => {
  const { user, authenticating } = useContext(AuthenticationContext);

  if (authenticating) {
    return "Loading...";
  }

  return user.user ? (
    <Route
      {...rest}
      render={(props) => {
        <Component {...props} />;
      }}
    />
  ) : (
    <Login />
  );
};

export default ProtectedRoute;
