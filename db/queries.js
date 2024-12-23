const pool = require("./pool");

async function getAllMovies(){
    const movies = await pool.query('SELECT * FROM movies');
    return movies.rows;
}

module.exports = { getAllMovies }