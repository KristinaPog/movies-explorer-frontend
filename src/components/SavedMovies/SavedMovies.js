import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({ loggedIn }) {
  return (<>
    <Header loggedIn={loggedIn} />
    <main className="movies">
      <div className="movies__container">
          <SearchForm />
          <MoviesCardList />
      </div>
    </main>
    <Footer />
  </>
  );
}

export default SavedMovies;