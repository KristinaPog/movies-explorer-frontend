import { useLocation } from "react-router-dom";
import React from "react";

import { computeDuration } from "../../utils/utils";

function MoviesCard({ movie, savedMovie, savedMovies, onLikeClick, onDeleteClick }) {

  const location = useLocation();

  const [isSavedMovie, setIsSavedMovie] = React.useState(savedMovie ? true : false);

  const handleLikeClick = () => {
    if (isSavedMovie) {
      onDeleteClick(savedMovies.filter((m) => m.movieId === movie.id)[0]);
      setIsSavedMovie(false);
    }
    else {
      onLikeClick(movie);
      setIsSavedMovie(true);
    }
  }

  const handleDeleteClick = () => {
    onDeleteClick(movie);
    setIsSavedMovie(false);
  }

  return (
    <li className="movie">
      <a href={movie.trailerLink} className="movie__link" target="_blank" rel="noopener noreferrer" >
        <img className="movie__image" alt={movie.nameRU} src={location.pathname === "/movies" ? `https://api.nomoreparties.co${movie.image.url}` : movie.image}
        />
      </a>
      <div className="movie__label">
        <div className="movie__info">
          <h2 className="movie__text">{movie.nameRU}</h2>
          <div className="movie__time">{computeDuration(movie.duration)}</div>
        </div>
        {location.pathname === "/movies" ?
          (<button
            type="button"
            className={`${isSavedMovie ? 'like like_active' : 'like'}`}
            aria-label="Добавить в избранное"
            onClick={handleLikeClick} />)
          : (<button
            type="button"
            className="delete"
            aria-label="Убрать из избранного"
            onClick={handleDeleteClick} />)}
      </div>
    </li >
  )
}

export default MoviesCard;