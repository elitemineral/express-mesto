const Card = require('../models/card');

module.exports.getCards = (_req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
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
    .then((card) => {
      card.populate('owner')
        .then((populateCard) => res.send({ data: populateCard }))
        .catch((err) => res.status(500).send({ message: err.name }));
    })
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.name }));
};
