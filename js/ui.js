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


//! OPENS MODAL FOR MOVIE DETAILS
const openMovie =  (id) => {
    var hiddenCards = document.getElementsByClassName('movie-card');
    document.getElementById(id).scrollIntoView({ block: "end", behavior: 'smooth' });
    
    getMovie(id);
    getReviews(id);
    getVideo(id);
    getSimilar(id);

    setTimeout(() => {
        document.getElementById("movie").classList += " active";
        document.getElementById("body").classList += " overflow-h";
        // getVideo(id);
    }, 1500)

    // hide all other cards
    toggleUnselectedCards(hiddenCards, id, showing = false);
}

//! CLOSE MODAL 
const closeMovie = (id) => {
    var hiddenCards = document.getElementsByClassName('movie-card');
    document.getElementById("movie").classList.remove("active");
    document.getElementById("body").classList.remove("overflow-h");

    toggleUnselectedCards(hiddenCards, id, showing = true);

}

//! ITERATE TO HIDE/SHIW UNSELECTED MOVIE CARDS 
const toggleUnselectedCards = (hiddenCards, id, showing) => {
    for (const card of hiddenCards) {
        if (parseInt(card.id) !== id) {
            card.style.transition = "0.5s all ease-in-out";
            showing ? card.style.opacity = 1 : card.style.opacity = 0;
            card.style.transitionProperty = "transition-delay";
            card.style.transitionDelay = "0.5s";
        }
    }
}

//! TOGGLES THE SEARCH ICON ON MOBILE NAV BAR
const toggleSearch = () => {
    mobSearch = !mobSearch;
    if (mobSearch === true) {
        // change class to show mobile search bar
        document.getElementById('header').classList += " show-search";
        // change button icon
        document.getElementById('btn-icon').classList = "fa fa-times";
    }
    else {
        // change class to hide mobile search bar
        document.getElementById('header').classList.remove("show-search");
        // change button icon
        document.getElementById('btn-icon').classList = "fa fa-search";
    }
}


window.addEventListener('click', function(e){   
    if (document.getElementById('details-container').contains(e.target)){
      // Clicked in box
    } else{
      // Clicked outside the box
      closeMovie();
    }
  });