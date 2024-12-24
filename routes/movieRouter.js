const { Router } = require("express");
const movieRouter = Router();

const moviesController = require("../controllers/moviesController");

movieRouter.get('/', moviesController.fetchMovies);
movieRouter.get('/genre', moviesController.fetchByGenre);
movieRouter.get('/new',moviesController.addMoviesForm);
movieRouter.post('/', moviesController.createNewMovies);
movieRouter.post('/:movie_id/delete', moviesController.deleteSelectedMovie);
movieRouter.post('/:movie_id/update', moviesController.updateSelectedMovie);
movieRouter.get('/search', moviesController.renderSearch);
module.exports = movieRouter;   