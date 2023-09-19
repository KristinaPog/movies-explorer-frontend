import logo from "../../images/logo.svg";
import { Link, NavLink } from "react-router-dom";

function Register() {
  return (
    <main className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo logo__register" />
        </Link>

        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="form">
          <label className="form__label form-register__label" for="username">Имя</label>
          <input
            required
            id="username"
            name="username"
            type="text"
            className="form__input form-register__input"
            placeholder="Имя"
            minlength="2"
            maxlength="50" />
          <span className="form__input-error name-input-error"></span>

          <label className="form__label form-register__label" for="email">E-mail</label>
          <input
            required
            id="email"
            name="email"
            type="email"
            className="form__input form-register__input"
            placeholder="E-mail"
            minlength="2"
            maxlength="50"
          />
          <span className="form__input-error name-input-error"></span>

          <label className="form__label form-register__label" for="password">Пароль</label>
          <input
            required
            id="password"
            name="password"
            type="password"
            className="form__input form-register__input"
            placeholder="Пароль"
            minlength="2"
            maxlength="50" />
          <span className="form__input-error name-input-error"></span>
          <p className="error__text">Что-то пошло не так...</p>
          <button className="form__button form-register__button" type="submit">Зарегистироваться</button>
        </form>

        <div className="register__text">
          <p>Уже зарегистрированы?</p>
          <NavLink to="/signin" className="register__link">Войти</NavLink>
        </div>
      </div>
    </main>
  )
}
export default Register;