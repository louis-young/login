import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import UserContext from "../../../context/UserContext";

const Dashboard = () => {
  const history = useHistory();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user.user) history.push("/login"); // Not a good solution to private routes.
  });

  return <div>Home</div>;
};

export default Dashboard;
