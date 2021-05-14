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
    movieYear.innerText = `Year: ${movieObj.year}` 
    
    let movieGenre = document.createElement ('p')
    movieSpan.append(movieGenre)
    movieGenre.innerText = `Genre: ${movieObj.genre}`
    filterMovies(moviesArray)

    // let moviePoster = document.createElement('img')
    // movieSpan.append(moviePoster)
    // moviePoster.src = movieObj.thumbnail

    function getMedia (moviesArray,movieObj) {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${movieObj.title}&api_key=`)
        .then (resp => resp.json())
        .then ((resp) => {
            let poster = resp.results[0].poster_path
            let moviePoster = document.createElement('img')
            moviePoster.src = `https://www.themoviedb.org/t/p/original${poster}`
            movieSpan.append(moviePoster)
            fetch(`
            https://api.themoviedb.org/3/movie/${resp.results[0].id}/videos?api_key=&language=en-US`)
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

    // let movieTrailer = document.createElement('iframe')
    // movieTrailer.src= 'https://www.youtube.com/embed/4r7wHMg5Yjg&t=5s'
    // movieSpan.append(movieTrailer)

    // function getVideos (moviesArray, movieObj) {
    //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieObj.search}&relevanceLanguage=en&safeSearch=moderate&key=AIzaSyCzx-q6vR_ioYRkaHPmcQjWFNsEEFxfXx4`)
    //     .then(resp => resp.json())
    //     .then ((resp)=> {
            
    //         let videoId = resp.items[0].id.videoId
            
    //         let movieTrailer = document.createElement('iframe')
    //         movieTrailer.src=`https://www.youtube.com/embed/${videoId}`
    //         movieSpan.append(movieTrailer)
           
    //     })
    //     }
    
        // getVideos(moviesArray, movieObj)
    
    let movieRating = document.createElement('p')
    movieSpan.append(movieRating)
    movieRating.innerText = `Review: ${movieObj.review}`
  


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
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieObj.title}&api_key=`)
                    .then (resp => resp.json())
                    .then ((resp) => {
                        let poster = resp.results[0].poster_path
                        let moviePoster = document.createElement('img')
                        moviePoster.src = `https://www.themoviedb.org/t/p/original${poster}`
                        movieSpan.append(moviePoster)
                        fetch(`
                        https://api.themoviedb.org/3/movie/${resp.results[0].id}/videos?api_key=&language=en-US`)
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

                // function getVideos (moviesArray,movieObj) {
                //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieObj.search}&relevanceLanguage=en&safeSearch=moderate&key=`)
                //     .then(resp => resp.json())
                //     .then ((resp)=> {
                //         let videoId = resp.items[0].id.videoId
                //         let movieTrailer = document.createElement('iframe')
                //         movieTrailer.src=`https://www.youtube.com/embed/${videoId}`
                //         movieSpan.append(movieTrailer)
                       
                //     })
                //     }
        
                //     getVideos(moviesArray, movieObj)
                    
                    
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

function reFilterMovies(moviesArray,movieObj) {
    genreSelect.onchange = function(e) {
        // console.log('hi')
      let  allMovies = document.querySelector("div#new-list.filtered-movies-list")
      allMovies.textContent=""
        
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
                    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieObj.title}&api_key=`)
                    .then (resp => resp.json())
                    .then ((resp) => {
                        let poster = resp.results[0].poster_path
                        let moviePoster = document.createElement('img')
                        moviePoster.src = `https://www.themoviedb.org/t/p/original${poster}`
                        movieSpan.append(moviePoster)
                        fetch(`
                        https://api.themoviedb.org/3/movie/${resp.results[0].id}/videos?api_key=&language=en-US`)
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

                // function getVideos (moviesArray,movieObj) {
                //     fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieObj.search}&relevanceLanguage=en&safeSearch=moderate&key=`)
                //     .then(resp => resp.json())
                //     .then ((resp)=> {
                //         let videoId = resp.items[0].id.videoId
                //         let movieTrailer = document.createElement('iframe')
                //         movieTrailer.src=`https://www.youtube.com/embed/${videoId}`
                //         movieSpan.append(movieTrailer)
                       
                //     })
                //     }
        
                //     getVideos(moviesArray, movieObj)
                    
                       
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

 