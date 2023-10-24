const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('/*', auth, () => {
  throw new NotFoundError('Нет пользователя с таким id');
});

module.exports = router;
