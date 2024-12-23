const { Router } = require("express");
const movieRouter = Router();

const moviesController = require("../controllers/moviesController");

movieRouter.get('/', moviesController.fetchMovies);
// movieRouter.get('/movies', moviesController.fetchMovies);
movieRouter.get('/genre', moviesController.fetchByGenre);

module.exports = movieRouter;