
//GLOBAL STUFF
let moviesList = document.querySelector('div#list')
let movieForm = document.querySelector('form')
let formTitle = document.querySelector('input#title')
let formDirector = document.querySelector('input#director')
let formYear = document.querySelector('input#year')
let formGenre = document.querySelector('input#genre')
let formReview = document.querySelector('input#review')
let formPoster = document.queryCommandEnabled('input#poster')
//let dropDown = document.querySelector()


//Get movies from database

function getMovies() {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then((moviesArray)=> {displayMovies(moviesArray)})
}

//function to display movies to the DOM
function displayMovies (moviesArray) {
moviesArray.forEach(element => {
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

    let moviePoster = document.createElement('img')
    movieSpan.append(moviePoster)
    moviePoster.src = element.thumbnail

    // let movieTrailer = document.createElement('iframe')
    // movieSpan.append(movieTrailer)
    // movieTrailer.src = element.preview

    // let movieRating = document.createElement('p')
    // movieSpan.append(movieRating)
    // movieRating.innerText = element.rating 

    let movieReview = document.createElement('p')
    movieSpan.append(movieReview)
    movieReview.innerText = `Review: ${element.review}`

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
