const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validation');
const {
  notFoundUserError,
  serverCrashedError,
} = require('../errors/error-texts');
const NotFoundError = require('../errors/not-found-err');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(serverCrashedError);
  }, 0);
});

router.post('/signin', signinValidation, login);

router.post('/signup', signupValidation, createUser);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('/*', auth, () => {
  throw new NotFoundError(notFoundUserError);
});

module.exports = router;
