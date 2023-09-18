import movie1 from "../../images/movie-1.png"
import { useLocation } from "react-router-dom";

function MoviesCard() {
  const location = useLocation();

  return (
    <li className="movie">
      <img className="movie__image" alt={"33 слова о дизайне"} src={movie1} />
      <div className="movie__label">
        <div className="movie__info">
          <h2 className="movie__text">33 слова о дизайне</h2>
          <div className="movie__time">1ч 47м</div>
        </div>
        <button type="button" className={`${location.pathname === "/movies" ? "like" : "delete"}`} aria-label="Поставить лайк" ></button>
      </div>
    </li>
  )
}

export default MoviesCard;