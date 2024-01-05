const Movie = require('../models/Movie');
const {
  SUCCESS_CODE,
  CREATED_CODE,
} = require('../errors/error-codes');
const {
  internalServerError,
  badRequest,
  noRights,
  notFoundMovieError,
} = require('../errors/error-texts');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');
const BadRequest = require('../errors/bad-request');
const NoRights = require('../errors/no-rights-err');

const createMovie = (req, res, next) => {
  const newCardData = req.body;
  newCardData.owner = req.user._id;
  return Movie.create(newCardData)
    .then((newCard) => res.status(CREATED_CODE).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(badRequest));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.status(SUCCESS_CODE).send(movies))
  .catch(() => next(new InternalServerError(internalServerError)));

const deleteMovieById = (req, res, next) => {
  const { _id } = req.params; // FIXME: _id
  return Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(notFoundMovieError);
      }
      if (!movie.owner.equals(req.user._id)) { // эта проверка не нужна вроде
        throw new NoRights(noRights);
      }
      movie.deleteOne()
        .then(() => res.status(SUCCESS_CODE).send({ message: 'фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(badRequest));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovieById,
};
