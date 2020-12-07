import React, { useContext } from "react";

import { AuthenticationContext } from "../../../context/AuthenticationContext";

import "./User.scss";

const User = () => {
  const { user, _delete } = useContext(AuthenticationContext);

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      _delete();
    }
  };

  return (
    <main className="page user">
      <h2 className="page__title">User</h2>

      <section className="user__details">
        <article className="user__detail">
          <h5 className="user__field">Name</h5>
          <p className="user__value">{user.user.name}</p>
        </article>

        <article className="user__detail">
          <h5 className="user__field">Email</h5>
          <p className="user__value">{user.user.email}</p>
        </article>
      </section>

      <button className="button button--danger" onClick={deleteAccount}>
        Delete Account
      </button>
    </main>
  );
};

export default User;
