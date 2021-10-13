const router = require('express').Router();
const {
  login,
  getUser,
  getUsers,
  createUser,
  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');

router.get('/sign-in', login);
router.get('/users/:userId', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.patch('/users/me', setUserInfo);
router.patch('/users/me/avatar', setUserAvatar);

module.exports = router;
