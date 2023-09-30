import logo from "../../images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";
import { useForm } from 'react-hook-form';
import React from "react";

function Register({ handleLogin }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    mainApi.register(data.email, data.password, data.name)
      .then(() => {
        mainApi.authorize(data.email, data.password)
        .then((data) => {
          handleLogin();
          navigate('/movies', { replace: true });
          localStorage.setItem('jwt', data.token);
          setIsLoading(false);
        })
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setErrorMessage('Пользователь с таким email уже зарегистрирован!')
        } else {
          setErrorMessage('Что-то пошло не так, попробуйте снова!')
        }
        console.log(err);
        setIsLoading(false);
      })
  }

  return (
    <main className="register">
      <div className="register__container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="logo logo__register" />
        </Link>

        <h1 className="register__title">Добро пожаловать!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
          <label className="form__label form-register__label" htmlFor="username">Имя</label>
          <input
            {...register('name', {
              required: "Поле обязательно к заполнению!",
              minLength: {
                value: 2,
                message: "Имя не может быть меньше 2 символов"
              },
              maxLength: {
                value: 30,
                message: "Имя не может быть больше 30 символов"
              },
              pattern: {
                message: 'Используйте только латиницу, кириллицу, пробел или дефис',
                value: /^[A-Za-zА-Яа-яЁё \\-]+$/
              },
            })}
            id="name"
            className={`form__input form-register__input ${errors?.name && 'form-register__input_error'}`}
            placeholder="Имя"
            disabled = {isLoading}
          />
          {errors?.name && <span className="form__input-error name-input-error">{errors?.name.message}</span>}

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
            className={`form__input form-register__input ${errors?.email && 'form-register__input_error'}`}
            id="email"
            disabled = {isLoading}
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
            className={`form__input form-register__input ${errors?.password && 'form-register__input_error'}`}
            placeholder="Пароль"
            disabled = {isLoading}
          />
          {errors?.password && <span className="form__input-error name-input-error">{errors?.password.message}</span>}
          
          <span className="register__error">{errorMessage}</span>
          <button className="form__button form-register__button" type="submit" disabled={!isValid || isLoading}>Зарегистироваться</button>
          
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