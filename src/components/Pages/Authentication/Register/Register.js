import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Axios from "axios";

import UserContext from "../../../../context/UserContext";

import Notification from "../../../Notification/Notification";

const Register = () => {
  const { setUser } = useContext(UserContext);

  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  /**
   * Register user.
   *
   * @param {object} event
   */

  const submit = async (event) => {
    event.preventDefault();

    try {
      const newUser = { name, email, password };

      await Axios.post(`${process.env.REACT_APP_API_URL}/users/register`, newUser);

      const response = await Axios.post(`${process.env.REACT_APP_API_URL}/users/login`, { email, password });

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
      <h2>Register</h2>
      {error && (
        <Notification
          message={error}
          clearMessage={() => {
            setError(null);
          }}
        />
      )}
      <form onSubmit={submit}>
        <input type="text" name="name" placeholder="Name" onChange={(event) => setName(event.target.value)} required />
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
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
