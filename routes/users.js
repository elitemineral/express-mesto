const router = require('express').Router();

const { appRoutes } = require('../utils/constants');
const { getUsers, createUser } = require('../controllers/users');

router.get(appRoutes.users, getUsers);
router.post(appRoutes.users, createUser);

module.exports = router;
