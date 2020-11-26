import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/UserContext";

const AuthenticationOptions = () => {
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  const register = () => {
    history.push("/register");
  };

  const login = () => {
    history.push("/login");
  };

  const logout = () => {
    setUser({
      token: null,
      user: null,
    });

    localStorage["authentication-token"] = "";
  };

  return (
    <nav className="options">
      {user.user ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      )}
    </nav>
  );
};

export default AuthenticationOptions;
