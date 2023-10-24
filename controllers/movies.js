const Movie = require('../models/Movie');
const {
  SUCCESS_CODE,
  CREATED_CODE,
} = require('../errors/error-codes');
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
        next(new BadRequest('invalid data'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(SUCCESS_CODE).send(movies))
  .catch(() => next(new InternalServerError('Server Error')));

const deleteMovieById = (req, res, next) => {
  const { cardId } = req.params;
  return Movie.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new NoRights('нет прав для удаления фильма');
      }
      card.deleteOne()
        .then(() => res.status(SUCCESS_CODE).send({ message: 'фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('invalid data'));
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
