const { getAllMovies, getByGenre, addMovie, deleteMovie, updateMovie } = require("../db/queries")

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

async function fetchByGenre(req,res){
    try{
        const genres = await getByGenre();
        res.render("genre",{genres});
        console.log(genres);    
    }
    catch(error){
        console.error("Error occurred displaying by genre: ", error)
    }
}

async function addMoviesForm(req,res){
    try{
        res.render("form");
    }
    catch(error){
        console.error("Error occurred accessing form: ", error)
    }
}


async function createNewMovies(req,res) {
    const { title,release_year,rating } = req.body;
    try{
        await addMovie(title,release_year,rating);
        res.redirect('/');
    }
    catch(error){
        console.error('Error occurred adding a new movie',error);
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

async function updateSelectedMovie(req,res) {
    const { title,release_year,rating } = req.body;
    try{
    }
    catch(error){
        console.error('Error occurred adding a new movie',error);
    }
}
module.exports = { fetchMovies, fetchByGenre, addMoviesForm, createNewMovies, deleteSelectedMovie, updateSelectedMovie }