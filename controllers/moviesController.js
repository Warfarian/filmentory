const { getAllMovies, getByGenre } = require("../db/queries")

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
        console.error("Error occured displaying by genre: ", error)
    }
}

module.exports = { fetchMovies, fetchByGenre }