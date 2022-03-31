const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0'
const DB_URL = 'https://api.themoviedb.org/3'
const POSTER_URL = 'https://image.tmdb.org/t/p/w500'
const NOW_URL = DB_URL + `/movie/now_playing?` + `api_key=` + API_KEY
const GENRES_URL = DB_URL + `/genre/movie/list?` + `api_key=` + API_KEY

var pageCount = 1;
var genres_obj;
var genres_arr;
var main = document.getElementById('main');
main.innerHTML = '';

//! GET GENRES
const getGenres = (url) => {
  fetch(url).then(res => res.json()).then(data => {
    genres_obj = data.genres
    data.genres.map(genre => genres_obj = { ...genres_obj, [genre.id]: genre.name })  //make genres object for easy key access
  })
}
getGenres(GENRES_URL);

//! ITERATE CARD GENRES
const cardGernes = (genres) => {
  let genresString = '';
  genres.map(genre => genresString += `${genres_obj[genre]}, `)
  return String(genresString).slice(0, -2)
}

//! RENDER MOVIE CARDS
const renderMovies = (data) => {
  pageCount++

  data.forEach(movie => {
    var { title, poster_path, release_date, overview, vote_average, genre_ids } = movie;
    let release_date_arr = release_date.split("-");
    let release_year = release_date_arr[0];

    overview === '' ? overview = "<h1>NO OVERVIEW AVAILABLE</h1>" : overview = ` <h6>${overview} </h6>`
    poster_path ? poster_path = (POSTER_URL + poster_path) : poster_path = './poster.jpg';

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-card');
    movieEl.innerHTML = `
        <span class=""></span>
        <img src="${poster_path}" alt="${title}"/>
        <div class="info">
          <div class="info-row">
            <h3>${title}</h3>
            <h4>${release_year}</h4>
          </div>
          <div class="info-row">
            <h4>${cardGernes(genre_ids)}</h4>
            <h4><i class="star"></i>${vote_average}</h4>
          </div>
        </div>
        <div class="overview  glass-morphism shdw-hvr rgb-hvr">
        <div class="overview-block   ">
          ${overview}
        </div>
        </div>
        `
    main.appendChild(movieEl)
  });
}

//! GET NOW PLAYING
const getNowPlaying = (url, page) => {
  fetch(`${url}&page=${page}`).then(res => res.json()).then(data => {
    renderMovies(data.results)
    console.log(data.results);
  })
}
getNowPlaying(NOW_URL, pageCount);


//! GET MORE MOVIES - INFINITE SCROLL
window.addEventListener('scroll', () => {
  let x = parseInt(document.documentElement.scrollHeight) - (parseInt(window.scrollY) + parseInt(window.innerHeight))

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    setTimeout('', 1000, getNowPlaying(NOW_URL, pageCount));
  }

})
