import React, { useContext } from "react";

import { AuthenticationContext } from "../../../context/AuthenticationContext";

const Test = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <main className="page">
      <h1>Test</h1>
      <p>Welcome, {user.user.name}</p>
    </main>
  );
};

export default Test;
