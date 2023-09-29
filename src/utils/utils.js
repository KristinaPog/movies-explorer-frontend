export function computeDuration (duration) {
  const minutes = duration % 60;
  const hours = Math.trunc(duration / 60);
  return `${hours}ч ${minutes}м`;
}



export function filterMovies (moviesList ,searchTerm) {
  //фильтруем список фильмов, каждый фильм проверяем на соответствие запросу пользователя. Ищем в названиях на двух языкаx
  const moviesBySearchTerm = moviesList.filter((movie) => {
    //переводим названия в нижний регистр и убираем лишние пробелы
    const movieRu = String(movie.nameRU).toLowerCase().trim();
    const movieEn = String(movie.nameEN).toLowerCase().trim();
    const userQuery = searchTerm.toLowerCase().trim();
    //проверяем содержитс ли запрос в массиве фильмов
    return movieRu.includes(userQuery) || movieEn.includes(userQuery);
  });
  return moviesBySearchTerm;
}

export function filterMoviesByDuration (movies) {
  return movies.filter(movie => movie.duration < 40);
}

