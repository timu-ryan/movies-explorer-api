const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  updateProfile,
  getMyProfile,
} = require('../controllers/users');
const {
  patchUserValidation,
} = require('../middlewares/validation');

router.get('/me', auth, getMyProfile);

router.patch('/me', auth, patchUserValidation, updateProfile);

module.exports = router;
