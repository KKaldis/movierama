const API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0'
const DB_URL = 'https://api.themoviedb.org/3'
const POSTER_URL = 'https://image.tmdb.org/t/p/w500'

//init page count for NOW PLAYING
var pageCountNow = 1;
//init page count for SEARCH
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

// run the fetch function to get the genres
getGenres();