const mongoose = require('mongoose');
const validator = require('validator');
const {
  urlValidationFailed,
} = require('../errors/error-texts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: urlValidationFailed,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: urlValidationFailed,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: urlValidationFailed,
    },
    required: true,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
