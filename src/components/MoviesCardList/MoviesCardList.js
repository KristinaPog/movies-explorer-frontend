import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <>
      <ul className="movies__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className="movies__button">Ещё</button>
    </>
  )
}

export default MoviesCardList;