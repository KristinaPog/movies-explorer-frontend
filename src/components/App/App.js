import React from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import * as mainApi from "../../utils/MainApi";
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Signin from "../Sign/Sign";
import NotFound from "../NotFound/NotFound";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isSuccess, setIsSucces] = React.useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    loggedIn && Promise.all([mainApi.getSavedlMovies(), mainApi.getUserInfo()])
      .then(([savedMovies, userData]) => {
        setSavedMoviesList(savedMovies.reverse());
        setCurrentUser(userData);
      })
      .catch((error) => { console.log(`Ошибка: ${error}`) })
  }, [loggedIn]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(path);
          }
          return;
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
    }
  }

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("all-movies");
    localStorage.removeItem("filtered-movies");
    localStorage.removeItem("saved-movies");
    localStorage.removeItem("search-term");
    localStorage.removeItem("checkbox-status");
    navigate("/");
    setLoggedIn(false);
  }

  function handleLikeClick(movie) {
    mainApi.saveMovie(movie)
      .then((movie) => { 
        setSavedMoviesList([movie, ...savedMoviesList]);
      })
      .catch((err) => (console.log(err)));
  }

  function handleDeleteClick(movie) {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMoviesList(savedMoviesList.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    mainApi.setUserInfo(userInfo)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsSucces(true);
      })
      .catch((err) => {
        setIsSucces(false);
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/movies" element=
            {<ProtectedRouteElement element={Movies}
              loggedIn={loggedIn}
              savedMovies={savedMoviesList}
              handleLikeClick={handleLikeClick}
              handleDeleteClick={handleDeleteClick}
              />}
          />
          <Route path="/saved-movies" element=
            {<ProtectedRouteElement element={SavedMovies}
              loggedIn={loggedIn}
              savedMovies={savedMoviesList}
              handleDeleteClick={handleDeleteClick} />}
          />
          <Route path="/profile" element=
            {<ProtectedRouteElement element={Profile}
              loggedIn={loggedIn}
              signOut={signOut}
              onUpdateUser={handleUpdateUser}
              isSuccess={isSuccess}
              />}
          />
          <Route path="/signup" element={!loggedIn ? <Register handleLogin={() => { setLoggedIn(true) }} /> : <Navigate to={'/'} replace />} />
          <Route path="/signin" element={!loggedIn ? <Signin handleLogin={() => { setLoggedIn(true) }} /> : <Navigate to={'/'} replace />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
