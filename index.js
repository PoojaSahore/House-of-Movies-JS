document.getElementById('bttn').addEventListener('click', add)
const div = document.getElementById('result')

    // fetch('http://www.omdbapi.com/?i=tt3896198&apikey=ac364a37')
    // .then(data => data.json())
    // .then(data => { console.log(data)
    //     div.innerHTML+= `<div class="col-md-6">
    //     <h3>${data.Title}</h3>
    //     <img src=${data.Poster}></div>`
    // })



function add() {   
    const input = document.getElementById('text').value.trim()

    if(input === '')
        alert('enter a movie to search')

    div.innerHTML = "click on the title or poster for more info<br><br>"
    div.style.textAlign = "center"
    document.getElementById('text').value = ''

    fetch(`https://www.omdbapi.com/?s=${input}&page=2&apikey=ac364a37`)
    .then(data => data.json())
    .then(data => { console.log(data,data.Search)
        if(data.Response === 'False')
        alert(data.Error)
        data.Search.map(movie => {
            div.innerHTML += `<div class="text-center">
                <h1 class="link" onclick="details('${movie.imdbID}')">${movie.Title}</h1>
                <img class="link" src=${movie.Poster} onclick="details('${movie.imdbID}')">
                <h6>Release year : ${movie.Year}</h6><br><br>
                </div>`
        })
    })
}

function details(movieId) {   
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=ac364a37`)
    .then(data => data.json())
    .then(movie => { console.log(movie)
        div.innerHTML = `<div class="text-center">
        <img src=${movie.Poster}>
        <h1>${movie.Title}</h1>
        <h5>Release year : ${movie.Released}</h5>
        <h6>Cast : ${movie.Actors}</h6>
        <h6>Director : ${movie.Director}</h6>
        <h6>Genre : ${movie.Genre}</h6>
        <h6>Runtime : ${movie.Runtime}</h6>
        <h6>Language : ${movie.Language}</h6>
        <h6>imdb Rating : ${movie.imdbRating}</h6>
        <p>${movie.Plot}</p>
        </div>`
    })
}
