import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Axios from "axios";

import UserContext from "../../../../context/UserContext";

import Notification from "../../../Notification/Notification";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  /**
   * Log user in.
   *
   * @param {object} event
   */

  const submit = async (event) => {
    event.preventDefault();

    try {
      const loginUser = { email, password };

      const response = await Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginUser);

      setUser({
        token: response.data.token,
        user: response.data.user,
      });

      localStorage["authentication-token"] = response.data.token;

      history.push("/");
    } catch (error) {
      const { message } = error.response.data;

      if (message) setError(message);
    }
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
