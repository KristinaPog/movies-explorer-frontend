import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { filterMovies, filterMoviesByDuration } from "../../utils/utils"

function SavedMovies({ loggedIn, savedMovies, handleDeleteClick }) {
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies); //фильмы отфильтрованные по названию
  const [filteredMoviesToNameAndCheckBox, setFilteredMoviesToNameAndCheckBox] = React.useState(savedMovies); //фильмы отфильтрованные по чекбоксу и названию
  const [shortMovies, setShortMovies] = React.useState(false); //checkbox
  const [isSuccessfulRequest, setIsSuccessfulRequest] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  function searchMovies(searchTerm, short) {
    const movies = filterMovies(savedMovies, searchTerm); //фильтруем
    setFilteredMovies(movies); //меняем стейт
    setSearchQuery(searchTerm);
    setFilteredMoviesToNameAndCheckBox(short ? filterMoviesByDuration(movies) : movies);
  }

  React.useEffect(() => {
    if (shortMovies) {
      setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(filterMovies(savedMovies, searchQuery)));
    }
    else {
      setFilteredMoviesToNameAndCheckBox(filterMovies(savedMovies, searchQuery));
    }
  }, [shortMovies, savedMovies, searchQuery]);

  React.useEffect(() => {
    if (filteredMoviesToNameAndCheckBox.length === 0) {
      setIsSuccessfulRequest(false);
    } else {
      setIsSuccessfulRequest(true);
    }
  }, [filteredMoviesToNameAndCheckBox]);

  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(filteredMovies));
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