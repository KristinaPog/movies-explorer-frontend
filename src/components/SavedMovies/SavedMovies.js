import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { filterMovies, filterMoviesByDuration } from "../../utils/utils"

function SavedMovies({ loggedIn, savedMovies, handleDeleteClick }) {
  const [filteredMovies, setFilteredMovies] = React.useState([]); //фильмы отфильтрованные по названию
  const [filteredMoviesToNameAndCheckBox, setFilteredMoviesToNameAndCheckBox] = React.useState(savedMovies); //фильмы отфильтрованные по чекбоксу и названию
  const [shortMovies, setShortMovies] = React.useState(false); //checkbox
  const [isSuccessfulRequest, setIsSuccessfulRequest] = React.useState(true);

  function searchMovies(searchTerm, short) {
    const movies = filterMovies(savedMovies, searchTerm); //фильтруем
    (movies.length === 0) ? (setIsSuccessfulRequest(false)) : (setIsSuccessfulRequest(true));
    setFilteredMovies(movies); //меняем стейт
    setFilteredMoviesToNameAndCheckBox(short ? filterMoviesByDuration(movies) : movies);
  }

  React.useEffect(() => {
    if (shortMovies) {
      setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(savedMovies));
    }
    else setFilteredMoviesToNameAndCheckBox(savedMovies);
  }, [shortMovies, savedMovies]);


  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (filterMoviesByDuration(filteredMovies).length === 0) {
        setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(filteredMovies));
      } else {
        setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(filteredMovies));
      }
    } else {
      setFilteredMoviesToNameAndCheckBox(filteredMovies);
    }
  }


  return (<div className="movies">
    <Header loggedIn={loggedIn} />
    <main >
      <div className="movies__container">
        <SearchForm
          searchMovies={searchMovies}
          onFilter={handleShortMovies} //обработчик включеного чекбокса
          shortMovies={shortMovies} />
        {isSuccessfulRequest ? <MoviesCardList
          movies={filteredMoviesToNameAndCheckBox}
          savedMovies={savedMovies}
          onDeleteClick={handleDeleteClick} /> : <span className="movies__error">Ничего не найдено!</span>}
      </div>
    </main>
    <Footer />
  </div>
  );
}

export default SavedMovies;