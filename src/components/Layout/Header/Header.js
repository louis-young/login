import React from "react";
import { Link } from "react-router-dom";
import AuthenticationOptions from "../../AuthenticationOptions/AuthenticationOptions";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Application
      </Link>
      <AuthenticationOptions />
    </header>
  );
};

export default Header;
