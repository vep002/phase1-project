//GLOBAL STUFF
let moviesList = document.querySelector('div#list')
let movieForm = document.querySelector('form')
    let formTitle = movieForm.querySelector('input#title')
    let formDirector = movieForm.querySelector('input#director')
    let formYear = movieForm.querySelector('input#year')
    let formGenre = movieForm.querySelector('input#genre')
    let formReview = movieForm.querySelector('input#review')
let dropDown = document.querySelector('div.dropdown')
let genreSelect = document.querySelector('select#genre');
    let horror = genreSelect.querySelector('option.genre1')
    let drama = genreSelect.querySelector('option.genre2')
    let action = genreSelect.querySelector('option.genre3')
    let comedy = genreSelect.querySelector('option.genre4')
let filteredMoviesList = document.querySelector('div#new-list.filtered-movies-list')

////////GLOBAL FUNCTION CALLS
getMovies()
submitNewMovie()
//////////////


//Get movies from database
function getMovies() {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then((moviesArray)=> {displayMovies(moviesArray)})
}

//function unpacks movies from database
function displayMovies (moviesArray) {
    moviesArray.forEach((movieObj) => {
    movieDetails(moviesArray, movieObj)})  
}

//displays movieObjects on the DOM
function movieDetails(moviesArray, movieObj){
    let movieSpan = document.createElement('span')
    movieSpan.id = movieObj.id
    moviesList.append(movieSpan)
    //create elements for each movie detail
    let movieTitle = document.createElement('h1')
    movieSpan.append(movieTitle)
    movieTitle.innerText = movieObj.title
    
    let movieDirector=document.createElement('p')
    movieSpan.append(movieDirector)
    movieDirector.innerText= `Director: ${movieObj.director}`

    let movieYear= document.createElement('p')
    movieSpan.append(movieYear)
    movieYear.innerText = movieObj.year 
    
    let movieGenre = document.createElement ('p')
    movieSpan.append(movieGenre)
    movieGenre.innerText = movieObj.genre
    filterMovies(moviesArray)

    let moviePoster = document.createElement('img')
    movieSpan.append(moviePoster)
    moviePoster.src = movieObj.thumbnail

    // let movieTrailer = document.createElement('iframe')
    // movieSpan.append(movieTrailer)
    // movieTrailer.src = element.preview


    let movieReview = document.createElement('p')
    movieSpan.append(movieReview)
    movieReview.innerText = `Review: ${movieObj.review}`


    let movieRatingForm = document.createElement("form");
    movieSpan.append(movieRatingForm)
    let movieRatingInput = document.createElement('input')
    movieRatingForm.append(movieRatingInput)
    movieRatingInput.setAttribute("type", "text");
    movieRatingInput.setAttribute("name", "rating");
    movieRatingInput.setAttribute("placeholder", "rating out of 10");
    movieSpan.append(movieRatingForm)
  
   
    let deleteButton = document.createElement('button')
    movieSpan.append(deleteButton)
    deleteButton.innerText = "Delete"
    deleteButton.id = movieObj.id
    deleteMovie(deleteButton, movieSpan)

    filterMovies(moviesArray)
}
    
//User can create a movie:
function submitNewMovie () {
  
    movieForm.addEventListener('submit', (e) => {
        let newDirector = formDirector.value 
        let newTitle = formTitle.value  
        let newYear = formYear.value
        let newGenre = formGenre.value 
        let newReview = formReview.value
        // let newPoster = formPoster.value 
    //persist to back end
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
          review: newReview,
        //   thumbnail: newPoster
      }),
      
    }) 
        .then((r) => r.json())
        .then((movieObj) => movieDetails(movieObj))

    })           
}
function filterMovies(moviesArray) {
    genreSelect.onchange = function(e) {
        // console.log('hi')
      let  allMovies = document.querySelector("div#list.movies-list")
      allMovies.remove()
        
      moviesArray.filter(function(movieObj) {
           if (movieObj.genre === genreSelect.value){
            let movieSpan = document.createElement('span')
            movieSpan.id = movieObj.id
            filteredMoviesList.append(movieSpan)

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

                let movieReview = document.createElement('p')
                movieSpan.append(movieReview)
                movieReview.innerText = movieObj.review
               
                let moviePoster = document.createElement('img')
                movieSpan.append(moviePoster)
                moviePoster.src = movieObj.thumbnail

                let deleteButton = document.createElement('button')
                movieSpan.append(deleteButton)
                deleteButton.innerText = "Delete"
                deleteButton.id = movieObj.id
                deleteFilteredMovie(deleteButton)
           }
        })
    }
}
function deleteMovie(deleteButton, movieSpan) {
    deleteButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/movies/${e.target.id}`, {
  method: "DELETE",
})
  .then((r) => r.json())
  .then((movieObj) => {
    if (movieObj.id === movieSpan.id){
        movieSpan.remove()
    }

  })
    })
}
function deleteFilteredMovie(deleteButton) {
    deleteButton.addEventListener('click',(e) => {
        let newSPan = document.querySelector('div#new-list.filtered-movies-list span')
        newSPan.remove()
    })
}

function rateMovie(movieRatingForm) {
    movieRatingForm.addEventListener("submit", (e) => {
        debugger
        let newRating = movieRatingForm.value
        fetch(`http://localhost:3000/movies/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          rating: rating.push(newRating)
      }),
      
    }) 
        .then((r) => r.json())
        .then((movieObj) => movieDetails(movieObj))
        movieRatingForm.reset()
    })           

    
}