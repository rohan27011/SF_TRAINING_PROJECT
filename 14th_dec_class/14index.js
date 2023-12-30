let data
const personUrl = 'http://api.themoviedb.org/3/person/';
const apiKey = 'f81e7188a3edbd50a3b8d2c31b32b365';
const movieUrl = 'http://api.themoviedb.org/3/movie/';
const imageUrl = 'http://image.tmdb.org/t/p/original';
let movieIds;
const queryString = window.location.search;
const queryParamsMap = new URLSearchParams(queryString);
console.log(queryParamsMap.get('id'), queryParamsMap.get('posterPath'))


import('/src/moviesPlay.js')
.then(res => {
	console.log('data imported into data constant');
	data = res;
    if (queryString) {
        showMovie(queryParamsMap.get('id'), queryParamsMap.get('posterPath'))        
    }
	run() 
});

function run() {
    
    const filteredMovies = data.movies.filter(movie => {
        return movie.runtimeMinutes > 150;
    })
    const totalRuntime = filteredMovies.reduce((acc, movie) => {
        return acc + movie.runtimeMinutes;
    }, 0)

    console.log('Total Runtime: ' + totalRuntime + ', avg runtime: ' + Math.floor(totalRuntime/filteredMovies.length))

    //Reformate the filtered output
    movieIds = filteredMovies.map(movie => movie.tmdbId)
    console.log(movieIds)
    // getMovieInformation(movieIds)
}

function getMovieInformation() {

    const fetchArray = movieIds.map(movieId => {
        return (
            fetch(`${movieUrl}${movieId}?api_key=${apiKey}`)
            .then(response => response.json())
        )
    });
    Promise.all(fetchArray)
    .then(fetchResponses => {
        const moviesInfo = fetchResponses.map(resp => {
            return {
                id: resp.id,
                overview: resp.overview,
                posterPath: resp.poster_path,
                releaseDate: resp.release_date,
                runTime: resp.runtime,
                tagLine: resp.tagline,
                title: resp.title
            }
        })
        console.log(moviesInfo)
        document.getElementById('content').innerHTML = getMovieHtml(moviesInfo);
    })
}
   
function getMovieHtml(moviesInfo) {
    let movieHtml = '<div class="ui link cards">'



    const movieCards = moviesInfo.reduce((html, movie) => {
        return html + `
        <div class="card">
            <div class="image">
                <a href='./movies.html?id=${movie.id}&posterPath=${movie.posterPath}'>
                    <img src = '${imageUrl}${movie.posterPath}'/>
                </a>
            </div>
            <div class="content">
                <div class="header">${movie.title}</div>
                <div class="meta">
                    <a>${movie.releaseDate}</a>
                </div>
                <div class="description">
                    ${movie.tagLine}
                </div>
            </div>
        </div>`
    }, '');

    movieHtml = `${movieCards}</div>`;
    console.log(movieHtml);
    return movieHtml
}

function showMovie(id, posterPath) {
    const movieInfo = data.movies.find(movie => {
        return movie.tmdbId === id;
    })
    getCastHtml(movieInfo.cast)
    .then(castHtml => {
        document.getElementById('castInfo').innerHTML = castHtml;
    })

    document.getElementById('title').innerHTML = movieInfo.title;
    document.getElementById('overview').innerHTML = movieInfo.overview;
    document.getElementById('moviePoster').innerHTML = `<img src = '${imageUrl}${posterPath}'/>`;
}

async function getCastHtml(cast) {
    const castFetchArray = cast.map(cm => {
        return (
            fetch(`${personUrl}${cm.id}?api_key=${apiKey}`)
            .then(response => response.json())
        )
    })
    const castResponse = await Promise.all(castFetchArray)
    let castHtml = '<div class="ui cards">'
    castResponse.forEach(cr => {
        castHtml += `
            <div class="card">
                <div class="content">
                    <img class="right floated mini ui image" src="${imageUrl}${cr.profile_path}">
                    <div class="header">
                        ${cr.name}
                    </div>
                    <div class="meta">
                        ${cr.birthday}
                    </div>
                </div>
            </div>
        `
    })
    castHtml += '</div>'
    return castHtml;
}