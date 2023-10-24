const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  updateProfile,
  getMyProfile,
} = require('../controllers/users');

router.get('/me', auth, getMyProfile);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string(),
  }),
}), updateProfile);

module.exports = router;
