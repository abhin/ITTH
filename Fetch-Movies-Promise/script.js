function fetchMovies() {
    let response = fetch("https://www.omdbapi.com/?apikey=144e0763&s=Harry");

    response.then((dataPromise) => {
        let movieData = dataPromise.json();
        movieData.then((movies) => {
            console.log(movies.json());
        });
    });
}

fetchMovies();