const pool = require("./pool");

async function getAllMovies(){
    const movies = await pool.query('SELECT * FROM movies');
    return movies.rows;
}

async function getByGenre(){
    const genres = await pool.query('SELECT * FROM genres');
    return genres.rows;
}

async function addMovie(title, release_year, rating) {
    try {
        const query = `
            INSERT INTO movies (title, release_year, rating) 
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [title, release_year, rating]);
        console.log("Movie added successfully!");
    } catch (error) {
        console.error("Error occurred in addMovie:", error);
        throw error; // Re-throw the error to handle it in the caller function
    }
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

async function updateMovie(movie_id, title, rating, release_year) {
    try {
        await pool.query(
            "UPDATE movies SET title = $1, rating = $2, release_year = $3 WHERE movie_id = $4",
            [title, rating, release_year, movie_id]
        );
        console.log("Updated successfully");
    } catch (error) {
        console.error("Error occurred updating movie:", error);
        throw error;
    }
}



// async function fetchMovie(movie_id) { WE MOVED THIS TO THE moviesController.js file cus this is too complicated.
//     try{
//         const movie = await pool.query('SELECT * FROM movies where movie_id = ($1)', [movie_id]);
//         return movie.rows;
//     }
//     catch(error){
//         console.error('Error fetching movie by movie id', error);
        
//     }
// }

module.exports = { getAllMovies, getByGenre, addMovie, deleteMovie, updateMovie }