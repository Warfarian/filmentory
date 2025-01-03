const { getAllMovies, getByGenre, addMovie, deleteMovie, updateMovie} = require("../db/queries")
const pool = require("../db/pool");

async function fetchMovies(req,res) {
    try{
        const movies = await getAllMovies();
        res.render("index", {movies});
        console.log(movies);
        
    }
    catch(error){
        console.error("Error fetching films: ",error);
    }
}

async function fetchMoviesByGenre(req, res) {
    try {
        const result = await pool.query(`
            SELECT 
                genres.genre_id, 
                genres.name AS genre_name, 
                movies.title AS movie_title
            FROM genres
            LEFT JOIN movie_genres ON genres.genre_id = movie_genres.genre_id
            LEFT JOIN movies ON movie_genres.movie_id = movies.movie_id
            ORDER BY genres.name, movies.title;
        `);

        // Group movies by genres
        const genres = {};
        result.rows.forEach((row) => {
            if (!genres[row.genre_id]) {
                genres[row.genre_id] = { name: row.genre_name, movies: [] };
            }
            if (row.movie_title) {
                genres[row.genre_id].movies.push(row.movie_title);
            }
        });

        res.render("genre", { genres });
    } catch (error) {
        console.error("Error fetching movies by genre:", error);
        res.status(500).send("Internal Server Error");
    }
}


async function addMoviesForm(req, res) {
    try {
        // Render the form with default (empty) values for adding a movie
        res.render("form", {
            movie_id: null,
            title: "",
            release_year: "",
            rating: ""
        });
    } catch (error) {
        console.error("Error occurred accessing form: ", error);
        res.status(500).send("Internal Server Error");
    }
}
    


async function createNewMovies(req, res) {
    const { title, release_year, rating } = req.body;

    try {
        // Validate required fields
        if (!title || !release_year || !rating) {
            return res.status(400).send("All fields are required!");
        }

        // Add the new movie to the database
        await addMovie(title, release_year, rating);
        res.redirect('/'); // Redirect to the list of movies after successful creation
    } catch (error) {
        console.error("Error occurred adding a new movie:", error);
        res.status(500).send("Internal Server Error");
    }
}


async function deleteSelectedMovie(req,res) {
    const { movie_id } = req.params ;
    console.log(movie_id);
    
    try{
        await deleteMovie(movie_id);
        res.redirect('/');
    }
    catch(error){
        console.error('Error occurred deleting the movie',error);
    }
}


async function updateSelectedMovie(req, res) {
    const { movie_id } = req.params; // Get movie ID from route params
    const { title, release_year, rating } = req.body; // Get data from request body

    try {
        if (!title || !release_year || !rating) {
            // If form fields are empty, fetch current data for pre-filling the form
            const movie = await fetchSelectedMovie(movie_id);
            if (!movie) {
                return res.status(404).send("Movie not found");
            }

            // Render form with current movie data
            return res.render("form", {
                movie_id: movie.movie_id,
                title: movie.title,
                release_year: movie.release_year,
                rating: movie.rating,
            });
        }

        // Update the movie with provided data
        await updateMovie(movie_id, title, rating, release_year);

        // Redirect to main page after successful update
        res.redirect("/");
    } catch (error) {
        console.error("Error occurred updating movie:", error);
        res.status(500).send("Internal Server Error");
    }
}

// for search
async function renderSearch(req, res) {
    try {
        const { search } = req.query;
        const result = await pool.query(
            "SELECT * FROM movies WHERE title LIKE $1", 
            [`%${search}%`] 
        );

        if (result.rows.length > 0) {
            res.render("search", {
                movies: result.rows, 
                found: true,
            });
        } else {
            res.render("search", { movies: [], found: false });
        }
    } catch (error) {
        console.error("Error searching:", error);
        res.status(500).send("Internal Server Error");
    }
}


// helper function for getting the specific movie for the update
async function fetchSelectedMovie(movie_id) {
    try {
        const result = await pool.query(
            "SELECT * FROM movies WHERE movie_id = $1",
            [movie_id]
        );

        return result.rows[0]; // Return single movie object
    } catch (error) {
        console.error("Error fetching specific movie:", error);
        throw error; // Re-throw error for upstream handling
    }
}

module.exports = { fetchMovies, fetchMoviesByGenre, addMoviesForm, createNewMovies, deleteSelectedMovie, updateSelectedMovie, fetchSelectedMovie, renderSearch }