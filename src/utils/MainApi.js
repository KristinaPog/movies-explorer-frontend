export const BASE_URL = 'https://api.pogodina.nomoredomainsicu.ru';

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name})
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
}; 

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
}; 

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
} 

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    }),
  }).then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const setUserInfo = (userInfo) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userInfo.name,
      email: userInfo.email
    })
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const getSavedlMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,        
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  })
}