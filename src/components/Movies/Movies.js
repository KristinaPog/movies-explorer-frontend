import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import moviesApi from "../../utils/MoviesApi";
import { filterMovies, filterMoviesByDuration } from "../../utils/utils"

function Movies({ loggedIn, savedMovies, handleLikeClick, handleDeleteClick }) {
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [filteredMovies, setFilteredMovies] = React.useState([]); //фильмы отфильтрованные по названию
  const [filteredMoviesToNameAndCheckBox, setFilteredMoviesToNameAndCheckBox] = React.useState([]); //фильмы отфильтрованные по чекбоксу и названию
  const [checkboxStatus, setCheckboxStatus] = React.useState(false); //checkbox
  const [loading, setLoading] = React.useState(false);
  const [isSuccessfulRequest, setIsSuccessfulRequest] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (localStorage.getItem('checkbox-status') === 'true') {
      setCheckboxStatus(true);
    } else {
      setCheckboxStatus(false);
    }
  }, []);

  //поиск фильмов в зависимости от поисковой фразы
  //-------------------------------------------------//
  function searchMovies(searchTerm) {
    localStorage.setItem('search-term', searchTerm);
    localStorage.setItem('checkbox-status', checkboxStatus);
    if (localStorage.getItem('all-movies')) {
      const movies = JSON.parse(localStorage.getItem('all-movies'));
      handleFilterMovies(movies, searchTerm, checkboxStatus);
      
    } else {
      setLoading(true);
      moviesApi.getInitialMovies()
        .then((cardsData) => {
          localStorage.setItem('all-movies', JSON.stringify(cardsData));
          handleFilterMovies(cardsData, searchTerm, checkboxStatus);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(()=>{
          setLoading(false);
        })
    }
  }

  function handleFilterMovies(moviesList, searchTerm, short) {
    const movies = filterMovies(moviesList, searchTerm); //фильтруем
    (movies.length === 0) ? (setIsSuccessfulRequest(false)) : (setIsSuccessfulRequest(true));
    setFilteredMovies(movies); //меняем стейт
    setFilteredMoviesToNameAndCheckBox(short ? filterMoviesByDuration(movies) : movies);
    localStorage.setItem('filtered-movies', JSON.stringify(movies));
    localStorage.setItem('search-term', searchTerm);
  }

  function handleShortMovies() {
    setCheckboxStatus(!checkboxStatus);
    if (!checkboxStatus) {
      if (filterMoviesByDuration(filteredMovies).length === 0) {
        setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(filteredMovies));
      } else {
        setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(filteredMovies));
      }
    } else {
      setFilteredMoviesToNameAndCheckBox(filteredMovies);
    }
    localStorage.setItem('checkbox-status', !checkboxStatus);
  }

  function calculateMoviesCount() {
    const display = window.innerWidth;
    if (display > 1047) {
      setMoviesCount(12);
    } else if (display > 617) {
      setMoviesCount(8);
    } else if (display <= 617) {
      setMoviesCount(5);
    }
  }

  React.useEffect(() => {
    calculateMoviesCount();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', calculateMoviesCount);
    }, 500);
  });

  function showMore() {
    const display = window.innerWidth;
    if (display > 1047) {
      setMoviesCount(moviesCount + 3);
    } else if (display > 613) {
      setMoviesCount(moviesCount + 2);
    }
    else if (display < 613) {
      setMoviesCount(moviesCount + 2);
    }
  }

  // рендер фильмов из локального хранилища
  React.useEffect(() => {
    if (localStorage.getItem('filtered-movies')) {
      const movies = JSON.parse(
        localStorage.getItem('filtered-movies')
      );
      setFilteredMovies(movies);
      if (localStorage.getItem('checkbox-status') === 'true') {
        setCheckboxStatus(true);
        setFilteredMoviesToNameAndCheckBox(filterMoviesByDuration(movies));
      } else {
        setCheckboxStatus(false);
        setFilteredMoviesToNameAndCheckBox(movies);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <main>
        <div className="movies__container">
          <SearchForm
            searchMovies={searchMovies} //функция поиска фильмов
            onFilter={handleShortMovies} //обработчик включеного чекбокса
            checkboxStatus={checkboxStatus}
          />
          {isSuccessfulRequest ? <MoviesCardList
            loading = {loading}
            movies={filteredMoviesToNameAndCheckBox}
            savedMovies={savedMovies}
            onLikeClick={handleLikeClick}
            onDeleteClick={handleDeleteClick}
            moviesCount={moviesCount} /> : <span className="movies__error">Ничего не найдено!</span>}
          <span className="movies__error">{errorMessage}</span>
          {filteredMoviesToNameAndCheckBox.length > moviesCount ? <button type="button" onClick={showMore} className="movies__button">Ещё</button> : ''}
          
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Movies;