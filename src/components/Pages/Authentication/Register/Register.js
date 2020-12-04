import React, { useState, useContext } from "react";

import { AuthenticationContext } from "../../../../context/AuthenticationContext";

import Notification from "../../../Notification/Notification";

const Register = () => {
  const { register, error, setError } = useContext(AuthenticationContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const credentials = { name, email, password };

    register(credentials);
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
