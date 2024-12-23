const { Router } = require("express");
const movieRouter = Router();

const moviesController = require("../controllers/moviesController");

movieRouter.get('/', moviesController.fetchMovies);
movieRouter.get('/genre', moviesController.fetchByGenre);
movieRouter.get('/new',moviesController.addMoviesForm);
movieRouter.post('/', moviesController.createNewMovies);

module.exports = movieRouter;   