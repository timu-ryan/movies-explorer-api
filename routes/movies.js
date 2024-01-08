const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createMovie,
  getMovies,
  deleteMovieById,
} = require('../controllers/movies');
const {
  postMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

router.get('/', auth, getMovies);

router.post('/', auth, postMovieValidation, createMovie);

router.delete('/:filmId', auth, deleteMovieValidation, deleteMovieById);

module.exports = router;
