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
    movieEl.setAttribute('onclick', `openMovie(${id});`);

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

//! ITERATE CARD GENRES & GENERATE GENRE TITLES
const cardGernes = (genresIds) => {
  //init genres string for storing
  let genresString = '';
  //add each genre from accesing the fetched genres list
  genresIds.map(genreId => genresString += `${genres[genreId]}, `)
  //return the genres as a list and remove the last " " and ","
  return String(genresString).slice(0, -2)
}