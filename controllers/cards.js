const Card = require('../models/card');
const { statusCodes } = require('../utils/constants');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
    likes,
    createdAt,
  } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
    likes,
    createdAt,
  })
    .then((card) => card.populate(['owner', 'likes']))
    .then((populatedCard) => res.send(populatedCard))
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
        return;
      }

      res.send({ message: 'Пост удалён' });
    })
    .catch((err) => next(err));
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
        return;
      }

      res.send(card);
    })
    .catch((err) => next(err));
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
        return;
      }

      res.send(card);
    })
    .catch((err) => next(err));
};
