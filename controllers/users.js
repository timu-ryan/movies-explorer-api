require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  SUCCESS_CODE,
  CREATED_CODE,
} = require('../errors/error-codes');
const {
  badRequest,
  notFoundErrorCard,
  conflictError,
  internalServerError,
} = require('../errors/error-texts');
const NotFoundError = require('../errors/not-found-err');
const InternalServerError = require('../errors/internal-server-err');
const ConflictError = require('../errors/conflict-err');
const BadRequest = require('../errors/bad-request');

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV = 'production', JWT_SECRET = 'not-dev-secret' } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .status(SUCCESS_CODE)
        .send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const newUserData = req.body;
  bcrypt.hash(newUserData.password, 10)
    .then((hash) => User.create({ ...newUserData, password: hash }))
    .then(({
      name, email,
    }) => res.status(CREATED_CODE).send({
      name, email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictError));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(badRequest));
      } else {
        next(err);
      }
    });
};

const getMyProfile = (req, res, next) => User.findById(req.user._id)
  .then((myProfile) => res.status(SUCCESS_CODE).send(myProfile))
  .catch(() => next(new InternalServerError(internalServerError)));

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundErrorCard);
      }
      return res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(conflictError));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(badRequest));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getMyProfile,
};
