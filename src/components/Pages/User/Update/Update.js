import React, { useContext, useState, useEffect } from "react";

import Notification from "../../../Notification/Notification";

import { AuthenticationContext } from "../../../../context/AuthenticationContext";

const Update = () => {
  const { user, update, notification, setNotification } = useContext(AuthenticationContext);

  const [name, setName] = useState(user.user.name);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setNotification(null);
  }, [setNotification]);

  const submit = async (event) => {
    event.preventDefault();

    const fields = { name, password };

    update(fields);

    setPassword("");
  };

  return (
    <section className="login">
      <form onSubmit={submit} className="form">
        <h2>Edit</h2>
        {notification && <Notification message={notification} />}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="form__input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="form__input"
        />

        <button type="submit" className="button form__submit">
          Update
        </button>
      </form>
    </section>
  );
};

export default Update;
