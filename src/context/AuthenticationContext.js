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

  const [notification, setNotification] = useState();

  const [authenticating, setAuthenticating] = useState(false);

  /**
   * Check to see if user is logged in on initial render.
   */

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setAuthenticating(true);

        const token = localStorage["authentication-token"] || "";

        const response = await Axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/token/valid`, null, {
          headers: {
            "x-authentication-token": token,
          },
        });

        if (!response.data) throw Error;

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

        setAuthenticating(false);
      } catch (error) {
        setUser({
          token: null,
          user: null,
        });

        localStorage["authentication-token"] = "";

        setAuthenticating(false);
      }
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

        history.push("/user");
      } catch (error) {
        const { message } = error.response.data;

        if (message) setNotification(message);
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

        history.push("/user");
      } catch (error) {
        const { message } = error.response.data;

        if (message) setNotification(message);
      }
    })();
  };

  // Named `_delete` due to the `delete` keyword.
  const _delete = () => {
    (async () => {
      try {
        const token = localStorage["authentication-token"] || "";

        const response = await Axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/delete`, {
          headers: {
            "x-authentication-token": token,
          },
        });

        if (!response.data) return;

        logout();
      } catch (error) {
        console.error(error.message);
      }
    })();
  };

  const update = (fields) => {
    (async () => {
      try {
        const token = localStorage["authentication-token"] || "";

        const response = await Axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/users/update`,
          { fields: fields },
          {
            headers: {
              "x-authentication-token": token,
            },
          }
        );

        if (!response.data) throw Error;

        setUser({
          ...user,
          user: response.data.user,
        });

        setNotification(response.data.message);
      } catch (error) {
        const { message } = error.response.data;

        if (message) setNotification(message);
      }
    })();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        notification,
        setNotification,
        login,
        logout,
        register,
        _delete,
        update,
        authenticating,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
