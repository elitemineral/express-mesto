const router = require('express').Router();

const { appRoutes } = require('../utils/constants');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get(appRoutes.cards, getCards);
router.post(appRoutes.cards, createCard);
router.delete(appRoutes.card, deleteCard);

module.exports = router;
