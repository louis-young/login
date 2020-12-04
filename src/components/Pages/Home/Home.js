import React from "react";
import { Link } from "react-router-dom";

import Test from "../../Pages/Test/Test";

const Home = () => {
  return (
    <>
      <div>Home</div>

      <Link to="/test">Test</Link>
    </>
  );
};

export default Home;
