class MoviesApi {
  constructor({url}) {
    this._url = url;
  }

  _checkingTheServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,        
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkingTheServerResponse)
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;