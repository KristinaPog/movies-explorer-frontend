import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from 'react-hook-form';

import Header from "../Header/Header";

function Profile({ loggedIn, signOut, onUpdateUser, isSuccess }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isName, setIsName] = React.useState('');
  const [isEmail, setIsEmail] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
    mode: "all",
  });

  React.useEffect(() => {
    if (currentUser) {
      reset(currentUser);
      setIsName(currentUser.name);
      setIsEmail(currentUser.email)
    }
  }, [currentUser, reset]);


  React.useEffect(() => {
    ((currentUser.name === isName) && (currentUser.email === isEmail)) ? (setDisabled(true)) : (setDisabled(false)); 
  }, [currentUser.name, currentUser.email, isName, isEmail]);

  const onSubmit = (data) => {
    onUpdateUser({
      name: data.name,
      email: data.email,
    });
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <div className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="form form__profile" onSubmit={handleSubmit(onSubmit)} noValidate>
            <label className="form__label form__label_profile" htmlFor="username">
              Имя
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
                  }
                })}
                onChange={(evt) => {setIsName(evt.target.value)}}
                id="username"
                placeholder="Имя"
                className={`form__input form__input_profile ${errors?.name && 'form__input_profile_error'}`}
              />
            </label>
            {errors?.name && <span className="form__input-error name-input-error">{errors?.name.message}</span>}
            <p className="form__border"></p>
            <label className="form__label form__label_profile" htmlFor="email">E-mail
              <input
                {...register('email', {
                  required: "Поле обязательно к заполнению!",
                  pattern: {
                    message: 'Пожалуйста введите корректный email',
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
                  },
                })}
                onChange={(evt) => {setIsEmail(evt.target.value)}}
                placeholder="E-mail"
                id="email"
                className={`form__input form__input_profile ${errors?.email && 'form__input_profile_error'}`}
              />
            </label>
            {isSuccess && <span className="profile__notification">Данные успешно изменены!</span>}
            {errors?.email && <span className="form__input-error name-input-error">{errors?.email.message}</span>}
            <button className="form__button form__button_profile" type="submit" disabled={!isValid || disabled}>Редактировать</button>
          </form>
          <p className="exit" onClick={signOut}>Выйти из аккаунта</p>
        </div>
      </main>
    </>
  )
}

export default Profile;