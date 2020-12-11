import React from "react";
import { Link } from "react-router-dom";

import Test from "../../Pages/Test/Test";

const Home = () => {
  return (
    <>
      <main className="page">
        <h2 className="page__title">Home</h2>

        <Link to="/test" className="link">
          Protected Route Test
        </Link>
      </main>
    </>
  );
};

export default Home;
