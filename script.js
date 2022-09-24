
//div variables
let originalsDiv = document.getElementById('originalMovies');
let trendingDiv = document.getElementById('trending');
let topRatedDiv = document.getElementById('top_rated');
let modalWindow = document.getElementById('movieTrailer');

//base url format for movie object images
let rootUrl = 'https://image.tmdb.org/t/p/original';


//must append image path to url in order to pull images into web app

// Call the main functions the page is loaded
window.onload = () => {
  setFeatured();
  getTrending();
  getUpcoming();
  getTopRated();
}  

//make API call to get array of movies by category
//each category of movie requires its own unique API call
function fetchMovies(url, dom_element, path) {
  // Use Fetch with the url passed down 
  let response = fetch(url).then 
    (response => response.json())
    .then(data=>{
      // iterates through entire array of movie objects returned from API call
      // creates new img elements and appends to corresponding div assigned to that movie type
      for(i=0;i<data.results.length;i++){
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
  let trailerFoundDiv = document.getElementById('notFound');
  getMovieTrailer(id).then(data =>{
    if(data['results'].length > 0){
      let desiredObject = data['results'].filter(ele => ele.site == "YouTube" && ele.type == "Trailer");
      let key = String(desiredObject[0]['key']);
      modalWindow.setAttribute('src', ytRoot+key);
      trailerFoundDiv.style.display = 'none';
    }
    else if (data['results'].length == 0){
      trailerFoundDiv.style.display = '';
      modalWindow.setAttribute('src', '');
    }
    $('#trailerModal').modal('show');
  })
  .catch( err =>{
    if(err){
      trailerFoundDiv.style.display = '';
      modalWindow.setAttribute('src', '');
    }
    $('#trailerModal').modal('show');
  }
  )
}

//function that sets featured movie title onto DOM
function setFeatured(){
  //using API call that gets a list of movies currently playing in theatres
  let response = fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=19f84e11932abbc79e6d83f82d6d1045' ).then
  (response => response.json()).then
  (data => {
    let div = document.getElementsByClassName("featured")[0];
    div.style.backgroundImage = `url(${rootUrl+data['results'][0]['poster_path']})`;
    console.log(data['results'][0]);
    document.getElementById('featuredTitle').innerText = data['results'][0]['title'];
    document.getElementById('featuredDescription').innerText = data['results'][0]['overview'];

    let button = document.getElementsByClassName("button__play")[0];
    button.setAttribute("data-id", String(data.results[0].id));
    button.addEventListener("click", e => {setTrailer(e)})
  }).catch
  (err => {
    console.log(err);
  });
}

// ** Function that fetches Netflix Originals **
function getTrending() {
  fetchMovies('https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045' 
,originalsDiv, 'poster_path');
}
// ** Function that fetches Trending Movies **
function getUpcoming() {
  fetchMovies('https://api.themoviedb.org/3/movie/upcoming?api_key=19f84e11932abbc79e6d83f82d6d1045'
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





