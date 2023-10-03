import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, savedMovies, onLikeClick, onDeleteClick, moviesCount,  loading }) {

  function getSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id)
  }


  return (
    <section className="movies__list">
      {loading && <Preloader />}
      {
        movies.slice(0, moviesCount).map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            savedMovie={getSavedMovie(savedMovies, movie)}
            savedMovies={savedMovies}
            movie={movie}
            onLikeClick={onLikeClick}
            onDeleteClick={onDeleteClick}
          />))
      }
    </section>
  )
}

export default MoviesCardList;