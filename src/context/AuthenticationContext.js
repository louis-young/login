import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";

import Axios from "axios";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    token: null,
    user: null,
  });

  const [error, setError] = useState();

  /**
   * Check to see if user is logged in on initial render.
   */

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage["authentication-token"] || "";

      const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/token/valid`, null, {
        headers: {
          "x-authentication-token": token,
        },
      });

      if (!response.data) return;

      // Named `_user` due to the state variable name.
      const _user = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`, {
        headers: {
          "x-authentication-token": token,
        },
      });

      setUser({
        token,
        user: _user.data,
      });
    };

    checkUserLoggedIn();
  }, []);

  const login = (credentials) => {
    (async () => {
      try {
        const { email, password } = credentials;

        const loginUser = { email, password };

        const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, loginUser);

        setUser({
          token: response.data.token,
          user: response.data.user,
        });

        localStorage["authentication-token"] = response.data.token;

        history.push("/protected?origin=login");
      } catch (error) {
        const { message } = error.response.data;

        if (message) setError(message);
      }
    })();
  };

  const logout = () => {
    setUser({
      token: null,
      user: null,
    });

    localStorage["authentication-token"] = "";

    history.push("/");
  };

  const register = (credentials) => {
    (async () => {
      try {
        const { name, email, password } = credentials;

        const newUser = { name, email, password };

        await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, newUser);

        const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, { email, password });

        setUser({
          token: response.data.token,
          user: response.data.user,
        });

        localStorage["authentication-token"] = response.data.token;

        history.push("/protected?action=registered");
      } catch (error) {
        const { message } = error.response.data;

        if (message) setError(message);
      }
    })();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
