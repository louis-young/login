import React from "react";
import { Link } from "react-router-dom";

import Test from "../../Pages/Test/Test";

const Home = () => {
  return (
    <>
      <main className="page">
        <h1>Home</h1>

        <Link to="/test">Test</Link>
      </main>
    </>
  );
};

export default Home;
