
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

    // let dropDownContent = dropDown.querySelector('div.dropdown-content')


//Get movies from database

function getMovies() {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then((moviesArray)=> {displayMovies(moviesArray)})
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

    // let movieRating = document.createElement('p')
    // movieSpan.append(movieRating)
    // movieRating.innerText = element.rating 

    let movieReview = document.createElement('p')
    movieSpan.append(movieReview)
    movieReview.innerText = `Review: ${movieObj.review}`

    //movieDetails(moviesArray)
});

    

}
getMovies()
submitNewMovie()
//fill in movie details
//function movieDetails (moviesArray, element, movieTitle) {}
    
//User can create a movie:
function submitNewMovie () {
  
    movieForm.addEventListener('submit', (e) => {
       

        let newDirector = formDirector.value 
        let newTitle = formTitle.value  
        let newYear = formYear.value
        let newGenre = formGenre.value 
        let newReview = formReview.value
        let newPoster = formPoster.value 
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
          thumbnail: newPoster
      }),
    })
        .then((r) => r.json())
        .then((element) => function (element) {
                //create a span element for each movie, which is appended to the overall movie div
                let movieSpan = document.createElement('span')
                moviesList.append(movieSpan)
            
                //create elements for each movie detail
                let movieTitle = document.createElement('h1')
                movieSpan.append(movieTitle)
                movieTitle.innerText = element.title
                
            
                let movieDirector=document.createElement('p')
                movieSpan.append(movieDirector)
                movieDirector.innerText= `Director: ${element.director}`
            
                let movieYear= document.createElement('p')
                movieSpan.append(movieYear)
                movieYear.innerText = `Year Released: ${element.year}` 
                
                let movieGenre = document.createElement ('p')
                movieSpan.append(movieGenre)
                movieGenre.innerText = `Genre: ${element.genre}` 
            
                // let moviePoster = document.createElement('img')
                // movieSpan.append(moviePoster)
                // moviePoster.src = element.thumbnail
            
                // let movieTrailer = document.createElement('iframe')
                // movieSpan.append(movieTrailer)
                // movieTrailer.src = element.preview
            
                // let movieRating = document.createElement('p')
                // movieSpan.append(movieRating)
                // movieRating.innerText = element.rating 
            
                let movieReview = document.createElement('p')
                movieSpan.append(movieReview)
                movieReview.innerText = `Review: ${element.review}`;
    
    
    })
    })}

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
           }
        })
    }
}
