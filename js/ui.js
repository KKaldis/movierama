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
const openMovie = (id) => {
    var hiddenCards = document.getElementsByClassName('movie-card');
    document.getElementById(id).scrollIntoView({ block: "end", behavior: 'smooth' });

    getMovie(id);
    getReviews(id);
    getVideo(id);
    getSimilar(id);

    setTimeout(() => {
        document.getElementById("movie").classList += " active";
        document.getElementById("body").classList += " overflow-h";
    }, 1500)

    // hide all other cards
    for (const card of hiddenCards) {
        if (parseInt(card.id) !== id) {
            console.log(parseInt(card.id) !== id);
            card.classList += " hidden-card"
            console.log(card.classList);
        }
    }
}

//! CLOSE MODAL 
const closeMovie = () => {
    var hiddenCards = document.getElementsByClassName('movie-card');
    document.getElementById("movie").classList.remove("active");
    document.getElementById("body").classList.remove("overflow-h");

    setTimeout(() => {
        for (const card of hiddenCards) {
            card.classList.remove('hidden-card')
            console.log(card.classList);
        }
    }, 500)
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
