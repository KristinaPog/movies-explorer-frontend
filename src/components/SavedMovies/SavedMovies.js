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

  function searchMovies(searchTerm, short) {
    const movies = filterMovies(savedMovies, searchTerm); //фильтруем
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


  return (<>
    <Header loggedIn={loggedIn} />
    <main className="movies">
      <div className="movies__container">
        <SearchForm
          searchMovies={searchMovies}
          onFilter={handleShortMovies} //обработчик включеного чекбокса
          shortMovies={shortMovies} />
        <MoviesCardList
          movies={filteredMoviesToNameAndCheckBox}
          savedMovies={savedMovies}
          onDeleteClick={handleDeleteClick} />
      </div>
    </main>
    <Footer />
  </>
  );
}

export default SavedMovies;