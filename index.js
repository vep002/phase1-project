


//GLOBAL STUFF
let moviesList = document.querySelector('div#list')
let movieForm = document.querySelector('form')
    let formTitle = movieForm.querySelector('input#title')
    let formDirector = movieForm.querySelector('input#director')
    let formYear = movieForm.querySelector('input#year')
    let formGenre = movieForm.querySelector('input#genre')
    let formReview = movieForm.querySelector('input#review')
let dropDown = document.querySelector('div.dropdown')
const genreSelect = document.querySelector('select#genre');
    let horror = genreSelect.querySelector('option.genre1')
    let drama = genreSelect.querySelector('option.genre2')
    let action = genreSelect.querySelector('option.genre3')
    let comedy = genreSelect.querySelector('option.genre4')
    // let dropDownContent = dropDown.querySelector('div.dropdown-content')


//Get movies from database

function getMovies() {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then((moviesArray)=> {displayMovies(moviesArray), filterMovies(moviesArray)
    
    })
    
submitNewMovie()

}

//function to display movies to the DOM
function displayMovies (moviesArray) {
moviesArray.forEach(movieObj => {
    //create a span element for each movie, which is appended to the overall movie div
    let movieSpan = document.createElement('span')
    moviesList.append(movieSpan)

    //create elements for each movie detail
    let movieTitle = document.createElement('h1')
    movieSpan.append(movieTitle)
    movieTitle.innerText = movieObj.title
    

    let movieDirector=document.createElement('p')
    movieSpan.append(movieDirector)
    movieDirector.innerText=movieObj.director

    let movieYear= document.createElement('p')
    movieSpan.append(movieYear)
    movieYear.innerText = movieObj.year 
    
    let movieGenre = document.createElement ('p')
    movieSpan.append(movieGenre)
    movieGenre.innerText = movieObj.genre 

    // let moviePoster = document.createElement('img')
    // movieSpan.append(moviePoster)
    // moviePoster.src = element.image

    // let movieTrailer = document.createElement('iframe')
    // movieSpan.append(movieTrailer)
    // movieTrailer.src = element.preview

    // let movieRating = document.createElement('p')
    // movieSpan.append(movieRating)
    // movieRating.innerText = element.rating 

    let movieReview = document.createElement('p')
    movieSpan.append(movieReview)
    movieReview.innerText = movieObj.review
});

    //movieDetails(moviesArray)
    

}
getMovies()
// filterMovies()
//fill in movie details
//function movieDetails (moviesArray, element, movieTitle) {}
    
//User can create a movie:
function submitNewMovie () {
  
movieForm.addEventListener('submit', (e) => {
    e.preventDefault()  
    let newDirector = formDirector.value 
    let newTitle = formTitle.value  
    let newYear = formYear.value
    let newGenre = formGenre.value 
    let newReview = formReview.value 

    fetch('http://localhost:3000/movies', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
      director: newDirector,
      title: newTitle,
      year: newYear,
      genre: newGenre,
      review: newReview
  }),
})
    .then((r) => r.json())
    .then((movieObj) => displayMovies(movieObj));


})
}

function filterMovies(moviesArray) {
    genreSelect.onchange = function(e) {
        console.log('hi')
        debugger;
            moviesArray.filter(function(movie){
                if (movie.genre !== "drama"){
                    ////remove their parent from the DOM
                console.log(hi)

                if (e.target.value === "genre2"){
                    moviesArray.filter()
                }
                if (e.target.value === "genre3"){
                    moviesArray.filter()
                }
                if (e.target.value === "genre4"){
                    moviesArray.filter()
                }
            }
        })
    }
}

    
// }

 // genre.addEventListener("change", (e) => {
    //     debugger;
    //         console.log('Change');
    //         console.log(`e.target.value = ${ e.target.value }`)
        // moviesArray.filter(movieObj => movieObj.genre == dropDownContent.value)

            //moviesArray