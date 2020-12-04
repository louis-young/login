import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

const AuthenticationOptions = () => {
  const history = useHistory();

  const { user, logout } = useContext(AuthenticationContext);

  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };

  return (
    <nav className="options">
      {user.user ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <>
          <button onClick={login} className="options__button">
            Log In
          </button>
          <button onClick={register} className="options__button options__button--featured">
            Sign Up
          </button>
        </>
      )}
    </nav>
  );
};

export default AuthenticationOptions;
