import logo from "../../images/logo.svg";
import { Link, NavLink } from "react-router-dom";

function Signin() {
  return (
    <main className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo logo__register" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form className="form">
          <label className="form__label form-register__label" for="email">E-mail</label>
          <input
            required
            minlength="2"
            maxlength="50"
            id="email"
            name="email"
            type="email"
            className="form__input form-register__input"
            placeholder="E-mail" />
          <span className="form__input-error name-input-error"></span>

          <label className="form__label form-register__label" for="password">Пароль</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form__input form-register__input"
            placeholder="Пароль"
            minlength="2"
            maxlength="50" />
          <span className="form__input-error name-input-error"></span>

          <button className="form__button form-register__button form-sign__button" type="submit">Войти</button>
        </form>

        <div className="register__text">
          <p>Ещё не зарегистрированы?</p>
          <NavLink to="/signup" className="register__link">Регистрация</NavLink>
        </div>
      </div>

    </main>
  )
}

export default Signin;