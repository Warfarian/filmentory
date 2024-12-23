const { Router } = require("express");
const movieRouter = Router();

const moviesController = require("../controllers/moviesController");

movieRouter.get('/', moviesController.fetchMovies);

module.exports = movieRouter;