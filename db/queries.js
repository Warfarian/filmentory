const pool = require("./pool");

async function getAllMovies(){
    const movies = await pool.query('SELECT * FROM movies');
    return movies.rows;
}

async function getByGenre(){
    const genres = await pool.query('SELECT * FROM genres');
    return genres.rows;
}

module.exports = { getAllMovies, getByGenre }