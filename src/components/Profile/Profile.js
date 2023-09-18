import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Profile({ loggedIn }) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Кристина!</h2>
          <form className="form form__profile">
            <label className="form__label form__label_profile" for="username">
              Имя
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Имя"
                className="form__input form__input_profile"
                required />
              <span className="form__input-error name-input-error"></span>
            </label>
            <p className="form__border"></p>
            <label className="form__label form__label_profile">E-mail
              <input
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
                className="form__input form__input_profile"
                required />
              <span className="form__input-error name-status-error"></span>
            </label>
            <button className="form__button form__button_profile">Редактировать</button>
          </form>
          <p className="exit" onClick={signOut}>Выйти из аккаунта</p>
        </div>
      </section>
    </>
  )
}

export default Profile;