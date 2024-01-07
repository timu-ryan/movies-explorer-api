const mongoose = require('mongoose');
const validator = require('validator');
const {
  urlValidationFailed,
} = require('../errors/error-texts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  }, // checked
  director: {
    type: String,
    required: true,
  }, // checked
  duration: {
    type: Number,
    required: true,
  }, // checked
  year: {
    type: String,
    required: true,
  }, // checked
  description: {
    type: String,
    required: true,
  }, // checked
  image: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: urlValidationFailed,
    },
    required: true,
  }, // checked but idk
  trailerLink: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: urlValidationFailed,
    },
    required: true,
  }, // checked same
  thumbnail: {
    type: String,
    validate: {
      validator: (url) => validator.isURL(url),
      message: urlValidationFailed,
    },
    required: true,
  }, // checked same
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
  }, // we don't need to add it in frontend
  movieId: {
    type: Number,
    required: true,
  }, // checked
  nameRU: {
    type: String,
    required: true,
  }, // checked
  nameEN: {
    type: String,
    required: true,
  }, // checked
});

module.exports = mongoose.model('movie', movieSchema);
