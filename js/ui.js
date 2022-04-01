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


//! OPENS NEW WINDOW FOR MOVIE DETAILS
const openMovie = (id) => {
    var hiddenCards = document.getElementsByClassName('movie-card')
    document.getElementById(id).scrollIntoView({ block: "end", behavior: 'smooth' });
    document.getElementById(id).style.overflow = "hidden"

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
        }
    }
}

//! TOGGLES THE SEARCH INPUT
const toggleSearch = () => {
    mobSearch = !mobSearch;
    if (mobSearch === true) {
        document.getElementById('header').classList += " show-search";
    }
    else {
        document.getElementById('header').classList.remove("show-search");
    }
    console.log(mobSearch);
}