//! RENDER MOVIE CARDS
const renderMovies = (data) => {

  //create html body of movie cards
  data.forEach(movie => {
    //destruct of object to multiple variables
    var { title, poster_path, release_date, overview, vote_average, genre_ids, id } = movie;

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
    movieEl.setAttribute('onclick', `openMovie(${id});`);

    //card html body
    movieEl.innerHTML = `
          <span></span>
          <img src="${poster_path}" alt="${title}"/>
          <div class="info">
            <div class="info-row">
              <h3>${title}</h3>
              <h4>${formYear(release_date)}</h4>
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

//!RENDER MOVIE DETAILS
const setDetails = (data) => {
  var title
  title = document.getElementById("title");
  title.innerHTML = `${data.title}`
  var year
  year = document.getElementById("date");
  year.innerHTML = `${formYear(data.release_date)}`
}

//! RENDER MOVIE REVIEWS
const setReviews = (data) => {

  var reviews
  reviews = document.getElementById("reviews");
  data.length === 0 ?
    reviews.innerHTML = `<div class="tag">No Reviews</div>`
    :
    reviews.innerHTML = `<div class="no-tag">Reviews</div>`
  var i = 1;

  data.forEach(review => {

    if (i <= 2) {
      i++
      const movieEl = document.createElement('div');

      movieEl.innerHTML = `
     <div class='review-single'>
     <b>${review.author}</b>
     ${review.content}
     </div>
          `
      reviews.innerHTML += movieEl.innerHTML
    }
  }
  )
}

//! RENDER MOVIE TRAILER
const setVideo = (data) => {
  var video
  video = document.getElementById("video");
  data.length === 0 ? video.innerHTML = `<div class="no-tag">No Trailer</div>` : video.innerHTML = ``

  const movieEl = document.createElement('div');

  movieEl.innerHTML = `
  <div class="iframe-container">
  <iframe  src="https://www.youtube.com/embed/${data[0].key}" title="${data[0].name}" 
  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
  gyroscope; picture-in-picture" allowfullscreen>
  </iframe>
  </div>
  `

  video.innerHTML = movieEl.innerHTML
}

//! RENDER MOVIE SIMILARS
const setSimilar = (data) => {

  var similar
  similar = document.getElementById("similar");

  similar.innerHTML = ""
  data.forEach(movie => {
    //destruct of object to multiple variables
    var { title, poster_path, id } = movie;

    //conditional rendering for poster image
    poster_path ? poster_path = (POSTER_URL + poster_path) : poster_path = './poster.jpg';
    //create a div to store the new card 
    const movieEl = document.createElement('div');
    //add a class to the crated div - movie card
    movieEl.classList.add('details-movie-card');
    //set an id on the crated card
    movieEl.setAttribute('id', id);
    movieEl.setAttribute('onclick', `openMovie(${id});`);

    //card html body
    movieEl.innerHTML = `
            <span></span>
            <img src="${poster_path}" alt="${title}"/>
            `
    //add movie card to the list of rendered movie cards
    similar.appendChild(movieEl)
  });

}

//! CONVERT FROM FETCHED DATE TO YEAR
const formYear = (date) => {
  let release_year = date.split("-");
  return release_year[0];
}

//! ITERATE CARD GENRES & GENERATE GENRE TITLES
const cardGernes = (genresIds) => {
  //init genres string for storing
  let genresString = '';
  //add each genre from accesing the fetched genres list
  genresIds.map(genreId => genresString += `${genres[genreId]}, `)
  //return the genres as a list and remove the last " " and ","
  return String(genresString).slice(0, -2)
}