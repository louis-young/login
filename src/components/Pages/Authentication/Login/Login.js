import React, { useState, useContext } from "react";

import { AuthenticationContext } from "../../../../context/AuthenticationContext";

import Notification from "../../../Notification/Notification";

const Login = () => {
  const { login, error, setError } = useContext(AuthenticationContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const credentials = { email, password };

    login(credentials);
  };

  return (
    <section>
      <h2>Login</h2>
      {error && (
        <Notification
          message={error}
          clearMessage={() => {
            setError(null);
          }}
        />
      )}
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
