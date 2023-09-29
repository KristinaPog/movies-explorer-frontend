import logo from "../../images/logo.svg";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as mainApi from "../../utils/MainApi"
import { useForm } from 'react-hook-form';


function Signin({ handleLogin }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "all",
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState('');
  const onSubmit = (data) => {
    mainApi.authorize(data.email, data.password)
      .then((data) => {
        handleLogin();
        navigate('/movies', { replace: true });
        localStorage.setItem('jwt', data.token);
      })
      .catch(err => {
        if (err === 'Ошибка: 401') {
          setErrorMessage('Вы ввели неправильный логин или пароль!')
        } else {
          setErrorMessage('Что-то пошло не так, попробуйте снова!')
        }
        console.log(err);
      });
  }

  return (
    <main className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo logo__register" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
          <label className="form__label form-register__label" htmlFor="email">E-mail</label>
          <input
            {...register('email', {
              required: "Поле обязательно к заполнению!",
              pattern: {
                message: 'Пожалуйста введите корректный email',
                value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
              },
            })}
            placeholder="E-mail"
            className="form__input form-register__input"
            id="email"
          />
          {errors?.email && <span className="form__input-error name-input-error">{errors?.email.message}</span>}


          <label className="form__label form-register__label" htmlFor="password">Пароль</label>
          <input
          {...register('password', {
            required: "Пожалуйста введите пароль, не менее 8 и не более 30 символов!",
            minLength: {
              value: 8,
              message: "Пароль не может быть меньше 8 символов"
            },
            maxLength: {
              value: 30,
              message: "Пароль не может быть больше 30 символов"
            }
          })}
            id="password"
            type="password"
            className="form__input form-register__input"
            placeholder="Пароль"
            />
          {errors?.password && <span className="form__input-error name-input-error">{errors?.password.message}</span>}
          
          <span className="sign__error">{errorMessage}</span>
          <button className="form__button form-register__button form-sign__button" type="submit" disabled={!isValid}>Войти</button>
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