import React, { useContext } from "react";
import { Route, useHistory } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

const ProtectedRoute = ({ Component, ...rest }) => {
  const history = useHistory();

  const { user } = useContext(AuthenticationContext);

  if (!user.user) {
    history.push("/login");

    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
