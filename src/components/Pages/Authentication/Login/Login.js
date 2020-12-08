import React, { useState, useContext, useEffect } from "react";

import { AuthenticationContext } from "../../../../context/AuthenticationContext";

import Notification from "../../../Notification/Notification";

import "./Login.scss";

const Login = () => {
  const { login, notification, setNotification } = useContext(AuthenticationContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    setNotification(null);
  }, [setNotification]);

  const submit = async (event) => {
    event.preventDefault();

    const credentials = { email, password };

    login(credentials);
  };

  return (
    <section className="login">
      <form onSubmit={submit} className="form">
        <h2>Log In</h2>
        {notification && <Notification message={notification} />}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
          className="form__input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          className="form__input"
        />
        <button type="submit" className="button form__submit">
          Log In
        </button>
      </form>
    </section>
  );
};

export default Login;
