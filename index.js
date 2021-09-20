//GLOBAL VARIABLES
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
    movieYear.innerText = `Year: ${movieObj.year}` 
    
    let movieGenre = document.createElement ('p')
    movieSpan.append(movieGenre)
    movieGenre.innerText = `Genre: ${movieObj.genre}`

   

    // Fetch the media (poster and trailer) from a thrid party API
    function getMedia (moviesArray,movieObj) {
        // 1. use the movie's title (moveObj.title) and api key to get a response from the api
        fetch(`https://api.themoviedb.org/3/search/movie?query=${movieObj.title}&api_key=9dc69d9c934ecf7b240cbdd0a32017d7`)
        .then (resp => resp.json())
        // 2. take the response from the backend and create a poster element, which is then appended to the DOM
        .then ((resp) => {
            let poster = resp.results[0].poster_path
            let moviePoster = document.createElement('img')
            moviePoster.src = `https://www.themoviedb.org/t/p/original${poster}`
            movieSpan.append(moviePoster)
            // 3. make another fetch request to the api, this time using the id which is pulled from the first response. this is necessary because in order to find a movie's trailer in the api, we need a unique movie id. the unique movie id can be found within the general information about the movie we got from the first fetch request. this makes it so that when a new movie is added by the user, they do not have to kn ow the movie's id in order to add it to the site.
            fetch(`
            https://api.themoviedb.org/3/movie/${resp.results[0].id}/videos?api_key=9dc69d9c934ecf7b240cbdd0a32017d7&language=en-US`)
            .then(response => response.json())
            // 4. take the response from the backend and create a trailer element, which is appended to the DOM
            .then ((response) => {
                let videoKey = response.results[0].key
                let movieTrailer = document.createElement('iframe')
            movieTrailer.src=`https://www.youtube.com/embed/${videoKey}`
            movieSpan.append(movieTrailer)
            })
        })    
    }

    getMedia(moviesArray,movieObj)
    filterMovies(moviesArray)
            
    let deleteButton = document.createElement('button')
    movieSpan.append(deleteButton)
    deleteButton.innerText = "Delete"
    deleteButton.id = movieObj.id
    deleteMovie(deleteButton, movieSpan)
     
}
    
//User can create a movie:
function submitNewMovie () {
  
    movieForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let newDirector = formDirector.value 
        let newTitle = formTitle.value  
        let newYear = formYear.value
        let newGenre = formGenre.value 
        let newReview = formReview.value
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
      }),
      
    }) 
        .then((r) => r.json())
        .then((movieObj) => movieDetails(movieObj))

})           
}

// User can filter movies by genre:
function filterMovies(moviesArray) {
    //1. when the genreselect element is changed, all movies are removed from the DOM
    genreSelect.onchange = function(e) {
        // console.log('hi')
      let  allMovies = document.querySelector("div#list.movies-list")
      allMovies.remove()
      
      //2. the moviesArray is filtered, if the genre of the movie matches the genre selected, then that movie is added to the DOM
      moviesArray.filter(function(movieObj) {
           if (movieObj.genre === genreSelect.value){
            //    console.log('hello!')
            //    debugger;
            let movieSpan = document.createElement('span')
            movieSpan.id = movieObj.id
            filteredMoviesList.append(movieSpan)

            let movieTitle = document.createElement('h1')
             movieSpan.append(movieTitle)
             movieTitle.innerText = movieObj.title
             let movieDirector=document.createElement('p')
                movieSpan.append(movieDirector)
                movieDirector.innerText= `Director: ${movieObj.director}`

                let movieYear= document.createElement('p')
                movieSpan.append(movieYear)
                movieYear.innerText = `Year: ${movieObj.year}` 
                
                let movieGenre = document.createElement ('p')
                movieSpan.append(movieGenre)
                movieGenre.innerText = `Genre: ${movieObj.genre}`
               

                let movieReview = document.createElement('p')
                movieSpan.append(movieReview)
                movieReview.innerText = `Review: ${movieObj.review}`

                function getMedia (moviesArray,movieObj) {
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieObj.title}&api_key=9dc69d9c934ecf7b240cbdd0a32017d7`)
                    .then (resp => resp.json())
                    .then ((resp) => {
                        let poster = resp.results[0].poster_path
                        let moviePoster = document.createElement('img')
                        moviePoster.src = `https://www.themoviedb.org/t/p/original${poster}`
                        movieSpan.append(moviePoster)
                        fetch(`
                        https://api.themoviedb.org/3/movie/${resp.results[0].id}/videos?api_key=9dc69d9c934ecf7b240cbdd0a32017d7&language=en-US`)
                        .then(response => response.json())
                        .then ((response) => {
                
                            let videoKey = response.results[0].key
                            let movieTrailer = document.createElement('iframe')
                        movieTrailer.src=`https://www.youtube.com/embed/${videoKey}`
                        movieSpan.append(movieTrailer)
                        })
                    })    
                }
                    
                getMedia(moviesArray,movieObj)
                reFilterMovies(moviesArray,movieObj)  

                let deleteButton = document.createElement('button')
                movieSpan.append(deleteButton)
                deleteButton.innerText = "Delete"
                deleteButton.id = movieObj.id
                deleteFilteredMovie(deleteButton)
           }
        })
    }

}

//User can refilter after a previous filter without refreshing the page
function reFilterMovies(moviesArray,movieObj) {
    genreSelect.onchange = function(e) {
        // console.log('hi')
        //1. th3e list of movies is a separate div element, which is now selected, then set to blank
      let  allMovies = document.querySelector("div#new-list.filtered-movies-list")
      allMovies.textContent=""
        
      moviesArray.filter(function(movieObj) {
          //2. the moviesArray is filtered, if the genre of the movie matches the genre selected, then that movie is added to the DOM
           if (movieObj.genre === genreSelect.value){
            //    console.log('hello!')
            //    debugger;
            let movieSpan = document.createElement('span')
            movieSpan.id = movieObj.id
            filteredMoviesList.append(movieSpan)

            let movieTitle = document.createElement('h1')
             movieSpan.append(movieTitle)
             movieTitle.innerText = movieObj.title
             let movieDirector=document.createElement('p')
                movieSpan.append(movieDirector)
                movieDirector.innerText= `Director: ${movieObj.director}`

                let movieYear= document.createElement('p')
                movieSpan.append(movieYear)
                movieYear.innerText = `Year: ${movieObj.year}` 
                
                let movieGenre = document.createElement ('p')
                movieSpan.append(movieGenre)
                movieGenre.innerText = `Genre: ${movieObj.genre}`
  

                let movieReview = document.createElement('p')
                movieSpan.append(movieReview)
                movieReview.innerText = `Review: ${movieObj.review}`


                function getMedia (moviesArray,movieObj) {
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieObj.title}&api_key=9dc69d9c934ecf7b240cbdd0a32017d7`)
                    .then (resp => resp.json())
                    .then ((resp) => {
                        let poster = resp.results[0].poster_path
                        let moviePoster = document.createElement('img')
                        moviePoster.src = `https://www.themoviedb.org/t/p/original${poster}`
                        movieSpan.append(moviePoster)
                        fetch(`
                        https://api.themoviedb.org/3/movie/${resp.results[0].id}/videos?api_key=9dc69d9c934ecf7b240cbdd0a32017d7&language=en-US`)
                        .then(response => response.json())
                        .then ((response) => {
                
                            let videoKey = response.results[0].key
                            let movieTrailer = document.createElement('iframe')
                        movieTrailer.src=`https://www.youtube.com/embed/${videoKey}`
                        movieSpan.append(movieTrailer)
                        })
                    })    
                }
                    
                getMedia(moviesArray,movieObj)

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
    if (movieSpan.id === e.target.id) {
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

 