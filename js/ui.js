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
    isDetailsOpen = true;
    var hiddenCards = document.getElementsByClassName('movie-card');
    document.getElementById(id).scrollIntoView({ block: "end", behavior: 'smooth' });

    // fetch all data
    getMovie(id);
    getReviews(id);
    getVideo(id);
    getSimilar(id);

    // show modal
    document.getElementById("movie").classList += " active";
    document.getElementById("body").classList += " overflow-h";

    // hide all other cards
    for (const card of hiddenCards) {
        if (parseInt(card.id) !== id) {
            card.classList += " hidden-card"
        }
    }
}

//! CLOSE MODAL 
const closeMovie = () => {
    isDetailsOpen = false;
    var hiddenCards = document.getElementsByClassName('movie-card');
    video.innerHTML = ""

    // hide modal
    document.getElementById("movie").classList.remove("active");
    document.getElementById("body").classList.remove("overflow-h");

    // show hidden cards
    for (const card of hiddenCards) {
        card.classList.remove('hidden-card')
    }
}

//! TOGGLES THE SEARCH ICON ON MOBILE NAV BAR
const toggleSearch = () => {
    mobSearch = !mobSearch;
    if (mobSearch === true) {
        document.getElementById('header').classList += " show-search";
        document.getElementById('btn-icon').classList = "fa fa-times";
    }
    else {
        document.getElementById('header').classList.remove("show-search");
        document.getElementById('btn-icon').classList = "fa fa-search";
    }
}

//! CLICK OUTSIDE MODAL HANDLER
window.addEventListener('click', function (e) {
    document.getElementById('movie') === e.target && closeMovie();
});

//! DEBOUNCER FOR SEARCH
const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
        if (!timer) {
            func.apply(this, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}