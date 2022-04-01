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