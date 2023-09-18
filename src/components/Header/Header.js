import React from "react";
import { useLocation, Link } from "react-router-dom";

import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const location = useLocation();


  return (
    <header className={`header ${location.pathname === "/" ? "header_landing" : ""} `}>
      <div className={`header__container ${location.pathname === "/" || location.pathname === "/profile" ? "header__container_landing" : ""}`}>
        <Link to="/" className="logo">
          <img src={logo} alt="Логотип" />
        </Link>
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  )
}

export default Header;