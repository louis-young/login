import React, { useState, useContext, useEffect } from "react";

import { AuthenticationContext } from "../../../../context/AuthenticationContext";

import Notification from "../../../Notification/Notification";

import "./Register.scss";

const Register = () => {
  const { register, error, setError } = useContext(AuthenticationContext);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    setError(null);
  }, []);

  const submit = async (event) => {
    event.preventDefault();

    const credentials = { name, email, password };

    register(credentials);
  };

  return (
    <section className="register">
      <form onSubmit={submit} className="form">
        <h2>Sign Up</h2>
        {error && <Notification message={error} />}
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          required
          className="form__input"
        />
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
        <button type="submit" className="form__submit button">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Register;
