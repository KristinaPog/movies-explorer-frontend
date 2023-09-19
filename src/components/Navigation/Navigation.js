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
          <button className={`navigation__close ${isBurgerOpen ? "navigation__close_active" : ""}`} onClick={handleCloseButton} type="button"></button>
          <nav className={`navigation__nav ${isBurgerOpen ? "navigation_open" : ""}`}>
            <ul className="navigation__list">
              <li>{location.pathname !== "/signin" && <NavLink to="/" className={`navigation__link ${!isBurgerOpen ? "navigation__link_disable" : ""} ${location.pathname === "/" && "navigation__link_active"}`}>Главная</NavLink>}</li>
              <li>{location.pathname !== "/signin" && <NavLink to="/movies" className={`navigation__link  ${location.pathname === "/movies" && "navigation__link_active"}`}>Фильмы</NavLink>}</li>
              <li>{location.pathname !== "/signup" && <NavLink to="/saved-movies" className={`navigation__link ${location.pathname === "/saved-movies" && "navigation__link_active"}`}>Сохранённые фильмы</NavLink>}</li>
            </ul>
            <Link to="/profile" className={`user  ${location.pathname !== "/" ? "user_black" : ""}`}>
              <p className="user__text">Аккаунт</p>
              <div className={`user__image ${location.pathname !== "/" ? "user__image_black" : ""}`} />
            </Link>
          </nav>
          <button className={`navigation__burger-btn  ${isBurgerOpen ? "navigation__burger-btn_active" : ""}`} onClick={setIsBurgerOpen} type="button"></button>
        </>) : (
        <nav className="navigation-unauthorized">
          <ul className="navigation-unauthorized__list">
            <li>{location.pathname !== "/signin" && <NavLink to="/signup" className="navigation-unauthorized__link">Регистрация</NavLink>}</li>
            <li>{location.pathname !== "/signin" && <NavLink to="/signin" className="navigation-unauthorized__link navigation-unauthorized__link_green">Войти</NavLink>}</li>
          </ul>
        </nav>
      )}
    </div>
  )
}

export default Navigation;

