import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

function Navigation({ loggedIn }) {
  const location = useLocation();


  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);

  function handleCloseButton() {
    setIsBurgerOpen(false);
  }

  return (

    <div className="navigation">
      <div className={`navigation__overlay ${isBurgerOpen ? "navigation__overlay_active" : ""}`}></div>
      {loggedIn ? (
        <>
          <button className={`navigation__close ${isBurgerOpen ? "navigation__close_active" : ""}`} onClick={handleCloseButton}></button>
          <nav className={`navigation__nav ${isBurgerOpen ? "navigation_open" : ""}`}>
            <ul className="navigation__list">
              {location.pathname !== "/signin" && <NavLink to="/" className={`navigation__item_disable ${isBurgerOpen ? "navigation__item" : ""} ${location.pathname === "/" && "navigation__item_active"}`}>Главная</NavLink>}
              {location.pathname !== "/signin" && <NavLink to="/movies" className={`navigation__item  ${location.pathname === "/movies" && "navigation__item_active"}`}>Фильмы</NavLink>}
              {location.pathname !== "/signup" && <NavLink to="/saved-movies" className={`navigation__item  ${location.pathname === "/saved-movies" && "navigation__item_active"}`}>Сохраненные фильмы</NavLink>}
            </ul>
            <Link to="/profile" className={`user && ${location.pathname !== "/" && "user_black"}`}>
              <p className="user__text">Аккаунт</p>
              <div className={`user__image && ${location.pathname !== "/" && "user__image_black"}`} />
            </Link>
          </nav>
          <button className={`navigation__burger-btn  ${isBurgerOpen ? "navigation__burger-btn_active" : ""}`} onClick={setIsBurgerOpen}></button>
        </>) : (
        <ul className="navigation-unauthorized__list">
          {location.pathname !== "/signin" && <NavLink to="/signup" className="navigation-unauthorized__item">Регистрация</NavLink>}
          {location.pathname !== "/signin" && <NavLink to="/signin" className="navigation-unauthorized__item navigation-unauthorized__item_green">Войти</NavLink>}
        </ul>
      )}


    </div>

  )
}

export default Navigation;

