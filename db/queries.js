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

async function deleteMovie(movie_id){
    try{
        await pool.query('DELETE FROM movies where movie_id = ($1)', [movie_id]);
        console.log('Deleted successfully');
    }
    catch(error){
        console.error('Error deleting movie', error);
    }
}

async function updateMovie(){
    
}
module.exports = { getAllMovies, getByGenre, addMovie, deleteMovie, updateMovie }