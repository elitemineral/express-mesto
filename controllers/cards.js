const Card = require('../models/card');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports.createCard = (req, res) => {
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
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.name }));
};
