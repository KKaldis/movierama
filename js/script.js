const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0'
const DB_URL = 'https://api.themoviedb.org/3'
const POSTER_URL = 'https://image.tmdb.org/t/p/w500'

//init page count
var pageCountNow = 1;
var pageCountSearch = 1;
// init genres list object {id: genre, ...}
var genres;
//init movie list - div 
var main;
//init searching state
var isSearching = false;
// init search string
var search;
// init search state
var scrolling = true;

//! RUN AFTER DOM IS FULLY LOADED
document.addEventListener("DOMContentLoaded", () => {
  // get the main html tag
  main = document.getElementById('main');
  // get the search input tag
  search = document.getElementById("search");
  // init movies card container variable
  main.innerHTML = '';
  // page load fetch now playing
  getNowPlaying(pageCountNow);
});

//! FETCH GENRES LIST FOR RENDERING THEM ON MOVIE CARDS
const getGenres = async () => {
  /// fetch command and url
  await fetch(`${DB_URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json()).then(data => {
    //convert genres object for easy key access when rendering movie cards
    data.genres.map(genre => genres = { ...genres, [genre.id]: genre.name })
  }).catch(error => {
    console.log(error.message);
  });
}
// run the fetch function to get the genres
getGenres();

//! ITERATE CARD GENRES & GENERATE GENRE TITLES
const cardGernes = (genresIds) => {
  //init genres string for storing
  let genresString = '';
  //add each genre from accesing the fetched genres list
  genresIds.map(genreId => genresString += `${genres[genreId]}, `)
  //return the genres as a list and remove the last " " and ","
  return String(genresString).slice(0, -2)
}

//! RENDER MOVIE CARDS
const renderMovies = (data) => {

  //create html body of movie cards
  data.forEach(movie => {
    //destruct of object to multiple variables
    var { title, poster_path, release_date, overview, vote_average, genre_ids, id } = movie;
    //split the date into year - month - day into array
    let release_date_arr = release_date.split("-");
    //get th year variable
    let release_year = release_date_arr[0];

    //conditional rendering when no overview
    overview === '' ? overview = "<h1>NO OVERVIEW AVAILABLE</h1>" : overview = ` <h6>${overview} </h6>`
    //conditional rendering for poster image
    poster_path ? poster_path = (POSTER_URL + poster_path) : poster_path = './poster.jpg';

    //create a div to store the new card 
    const movieEl = document.createElement('div');
    //add a class to the crated div - movie card
    movieEl.classList.add('movie-card');
    //set an id on the crated card
    movieEl.setAttribute('id', id);
    movieEl.setAttribute('onclick', `test(${id});`);

    //card html body
    movieEl.innerHTML = `
        <span></span>
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
    //add movie card to the list of rendered movie cards
    main.appendChild(movieEl)
  });
}


//! FETCH NOW PLAYING
const getNowPlaying = async (page) => {
  // fetch command and url
  await fetch(`${DB_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`).then(res => res.json()).then(data => {
    // render the fetched movies
    renderMovies(data.results)
  }).catch(error => {
    console.log(error.message);
  });
  // reset the search counter
  pageCountSearch = 1;
}

//! FETCH SEARCH
const getSearch = async (page, isTyping) => {


  //set the lenght of search to check if the user is searching
  search.value.length > 0 ? isSearching = true : isSearching = false

  //check if is typing or scroling to reset or add search results
  if (isTyping !== "scrolling") {
    main.innerHTML = ""
  }

  //logic based on if the user is fetching
  if (isSearching === true) {
    // fetch command and url
    await fetch(`${DB_URL}/search/movie?api_key=${API_KEY}&query=${search.value}&page=${page}`).then(res => res.json()).then(data => {
      // render the fetched movies
      renderMovies(data.results)
    }).catch(error => {
      console.log(error.message);
    });
  }
  else {
    // reset the search counter
    pageCountNow = 1;
    //fetch now playing if not searching
    getNowPlaying(pageCountNow);
  }
}

//! GET MORE MOVIES - INFINITE SCROLL. SEARCH / PLAYING NOW UI LOGIC
window.addEventListener('scroll', () => {

  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight
    && scrolling === true) {
    if (isSearching === true) {
      pageCountSearch++
      getSearch(pageCountSearch, "scrolling")
    }
    else {
      pageCountNow++
      getNowPlaying(pageCountNow)
    }
  }
})

const test = (id) => {
  var hiddenCards = document.getElementsByClassName('movie-card')
  document.getElementById(id).scrollIntoView({ block: "end", behavior: 'smooth' });
  document.getElementById(id).style.overflow = "hidden"

  var body = document.getElementsByTagName("body").classList


  setTimeout(() => {

    document.getElementById("movie").classList += " active";
    document.getElementById("body").classList += " overflow-h";
  }, 1500)






  // hide all other cards
  for (const card of hiddenCards) {
    if (parseInt(card.id) !== id) {
      card.style.transition = "0.5s all ease-in-out"
      card.style.opacity = 0;
      card.transitionProperty = "transition-delay"
      card.style.transitionDelay = "0.5s";
      // card.style.display = "none";
    }
  }

  console.log('etreklse', id);
}

