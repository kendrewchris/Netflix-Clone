/* 
🌟 APP: Make Netflix

Here we have the Netflix app but it's up to you to make it work by pulling all the movies using an API!

Create a fetchMovies() function that will make a dynamic API call to what you need 👇
========================================

- fetchMovies()

** fetchMovies takes in an URL, a div id or class from the HTML, and a path (poster or backdrop)



These are the 3 main functions and their URL'S you must create  👇
========================================

- getOriginals()
  * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'

- getTrendingNow()
  * URL : 'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'

- getTopRated()
  * URL : 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'


** These functions will provide the URL you need to fetch() movies of that genere **

These are all the DIV ID's you're gonna need access to 👇
========================================================
#1 CLASS 👉 'original__movies' = Div that holds Netflix Originals
#2 ID 👉 'trending' = Div that holds trending Movies
#3 ID 👉 'top_rated' = Div that holds top rated Movies
*/

//div variables
let originalsDiv = document.getElementById('originalMovies');
let trendingDiv = document.getElementById('trending');
let topRatedDiv = document.getElementById('top_rated');
let modalWindow = document.getElementById('movieTrailer');


//must append image path to url in order to pull images into web app

// Call the main functions the page is loaded
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
}

//make API call to get array of movies by category
//each category of movie requires its own unique API call
function fetchMovies(url, dom_element, path) {
  //base url format for movie object images
  let rootUrl = 'https://image.tmdb.org/t/p/original';
  // Use Fetch with the url passed down 
  let response = fetch(url).then 
    (response => response.json())
    .then(data=>{
      // iterates through entire array of movie objects returned from API call
      // creates new img elements and appends to corresponding div assigned to that movie type

      for(i=0;i<data.results.length;i++){
        console.log(data.results.length);
        let tempElem = document.createElement("img");
        tempElem.setAttribute("src", String(rootUrl + data.results[i][path]));
        tempElem.setAttribute("data-id", String(data.results[i].id));
        tempElem.addEventListener("click", e => {setTrailer(e)})
        dom_element.appendChild(tempElem);
      }


    }) 
    .catch(err => {
      //error handler
      console.error(err);
    });
}

function setTrailer(e){
  let ytRoot = 'https://www.youtube.com/embed/';
  let id = e.target.getAttribute('data-id');
  getMovieTrailer(id).then(data =>{
    console.log(data['results']);
    if(data['results'].length > 0){
      modalWindow.classList.add('d-none');
      modalWindow.classList.remove('d-none');

      let key = String(data['results'][0]['key']);
      console.log(data['results']);
      modalWindow.setAttribute('src', ytRoot+key);
      $('#trailerModal').modal('show');
    }
    else{
      modalWindow.classList.add('d-none');
      modalWindow.classList.remove('d-none');
    }
    $('#trailerModal').modal('show');
  })
}

// ** Function that fetches Netflix Originals **
function getOriginals() {
  fetchMovies('https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213' 
,originalsDiv, 'poster_path');
}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  fetchMovies('https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
,trendingDiv, 'backdrop_path');

}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  fetchMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
,topRatedDiv, 'backdrop_path');
}

// ** BONUS **

// ** Fetches URL provided and returns response.json()
async function getMovieTrailer(id) {
  return await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US`)
  .then(response => {
    return response.json();
  })
  .catch(error => {
    console.log(error);
  });

}

// ** Function that adds movie data to the DOM
// const setTrailer = trailers => {
//   // Set up iframe variable to hold id of the movieTrailer Element
//   const iframe
//   // Set up variable to select .movieNotFound element
//   const movieNotFound

//   // If there is a trailer add the src for it
//   if (trailers.length > 0) {
//     // add d-none class to movieNotFound and remove it from iframe

//     // add youtube link with trailers key to iframe.src
//   } else {
//     // Else remove d-none class to movieNotfound and ADD it to iframe

//   }
// }





