const pool = require("./pool");

async function getAllMovies(){
    const movies = await pool.query('SELECT * FROM movies');
    return movies.rows;
}

async function getByGenre(){
    const genres = await pool.query('SELECT * FROM genres');
    return genres.rows;
}

async function addMovie(title,release_year,rating){
    const newMovie = await pool.query('INSERT INTO movies(title,release_year,rating) values ($1,$2,$3)',[title,release_year,rating]);   
}

module.exports = { getAllMovies, getByGenre, addMovie }