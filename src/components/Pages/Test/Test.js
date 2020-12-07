import React, { useContext } from "react";

import { AuthenticationContext } from "../../../context/AuthenticationContext";

const Test = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <main className="page">
      <h2 className="page__title">Test</h2>
      <p>Hello, {user.user.name}</p>
    </main>
  );
};

export default Test;
