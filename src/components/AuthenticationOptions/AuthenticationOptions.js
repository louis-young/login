import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

import "./AuthenticationOptions.scss";

const AuthenticationOptions = () => {
  const history = useHistory();

  const { user, logout } = useContext(AuthenticationContext);

  return (
    <nav className="options">
      {user.user ? (
        <>
          <button
            onClick={() => history.push("/user")}
            className="button button--inverted button--pill button--inline options__button"
          >
            Profile
          </button>
          <button onClick={logout} className="button button--pill button--inline options__button">
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => history.push("/login")}
            className="button button--inverted button--pill button--inline options__button"
          >
            Log In
          </button>
          <button
            onClick={() => history.push("/register")}
            className="button button--pill button--inline options__button options__button--featured"
          >
            Sign Up
          </button>
        </>
      )}
    </nav>
  );
};

export default AuthenticationOptions;
