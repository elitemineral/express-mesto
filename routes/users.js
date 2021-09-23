const router = require('express').Router();

const { appRoutes } = require('../utils/constants');
const { getUser, getUsers, createUser } = require('../controllers/users');

router.get(appRoutes.user, getUser);
router.get(appRoutes.users, getUsers);
router.post(appRoutes.users, createUser);

module.exports = router;
