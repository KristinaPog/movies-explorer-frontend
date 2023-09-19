import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"

function Movies({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <div className="movies__container">
          <SearchForm />
          <MoviesCardList />
          <button type="button" className="movies__button">Ещё</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Movies;